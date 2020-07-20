from _compat_pickle import (IMPORT_MAPPING, REVERSE_IMPORT_MAPPING,
                            NAME_MAPPING, REVERSE_NAME_MAPPING)
import builtins
import pickle
import io
import collections
import struct
import sys

import unittest
from test import support

from test.pickletester import AbstractUnpickleTests
from test.pickletester import AbstractPickleTests
from test.pickletester import AbstractPickleModuleTests
from test.pickletester import AbstractPersistentPicklerTests
from test.pickletester import AbstractPicklerUnpicklerObjectTests
from test.pickletester import AbstractDispatchTableTests
from test.pickletester import BigmemPickleTests

try:
    import _pickle
    has_c_implementation = True
except ImportError:
    has_c_implementation = False


class PickleTests(AbstractPickleModuleTests):
    pass


class PyUnpicklerTests(AbstractUnpickleTests):

    unpickler = pickle._Unpickler
    bad_stack_errors = (IndexError,)
    bad_mark_errors = (IndexError, pickle.UnpicklingError,
                       TypeError, AttributeError, EOFError)
    truncated_errors = (pickle.UnpicklingError, EOFError,
                        AttributeError, ValueError,
                        struct.error, IndexError, ImportError)

    def loads(self, buf, **kwds):
        f = io.BytesIO(buf)
        u = self.unpickler(f, **kwds)
        return u.load()


class PyPicklerTests(AbstractPickleTests):

    pickler = pickle._Pickler
    unpickler = pickle._Unpickler

    def dumps(self, arg, proto=None):
        f = io.BytesIO()
        p = self.pickler(f, proto)
        p.dump(arg)
        f.seek(0)
        return bytes(f.read())

    def loads(self, buf, **kwds):
        f = io.BytesIO(buf)
        u = self.unpickler(f, **kwds)
        return u.load()


class InMemoryPickleTests(AbstractPickleTests, AbstractUnpickleTests,
                          BigmemPickleTests):

    pickler = pickle._Pickler
    unpickler = pickle._Unpickler
    bad_stack_errors = (pickle.UnpicklingError, IndexError)
    bad_mark_errors = (pickle.UnpicklingError, IndexError,
                       TypeError, AttributeError, EOFError)
    truncated_errors = (pickle.UnpicklingError, EOFError,
                        AttributeError, ValueError,
                        struct.error, IndexError, ImportError)

    def dumps(self, arg, protocol=None):
        return pickle.dumps(arg, protocol)

    def loads(self, buf, **kwds):
        return pickle.loads(buf, **kwds)


class PyPersPicklerTests(AbstractPersistentPicklerTests):

    pickler = pickle._Pickler
    unpickler = pickle._Unpickler

    def dumps(self, arg, proto=None):
        class PersPickler(self.pickler):
            def persistent_id(subself, obj):
                return self.persistent_id(obj)
        f = io.BytesIO()
        p = PersPickler(f, proto)
        p.dump(arg)
        f.seek(0)
        return f.read()

    def loads(self, buf, **kwds):
        class PersUnpickler(self.unpickler):
            def persistent_load(subself, obj):
                return self.persistent_load(obj)
        f = io.BytesIO(buf)
        u = PersUnpickler(f, **kwds)
        return u.load()


class PyPicklerUnpicklerObjectTests(AbstractPicklerUnpicklerObjectTests):

    pickler_class = pickle._Pickler
    unpickler_class = pickle._Unpickler


class PyDispatchTableTests(AbstractDispatchTableTests):

    pickler_class = pickle._Pickler

    def get_dispatch_table(self):
        return pickle.dispatch_table.copy()


class PyChainDispatchTableTests(AbstractDispatchTableTests):

    pickler_class = pickle._Pickler

    def get_dispatch_table(self):
        return collections.ChainMap({}, pickle.dispatch_table)


if has_c_implementation:
    class CUnpicklerTests(PyUnpicklerTests):
        unpickler = _pickle.Unpickler
        bad_stack_errors = (pickle.UnpicklingError,)
        bad_mark_errors = (EOFError,)
        truncated_errors = (pickle.UnpicklingError, EOFError,
                            AttributeError, ValueError)

    class CPicklerTests(PyPicklerTests):
        pickler = _pickle.Pickler
        unpickler = _pickle.Unpickler

    class CPersPicklerTests(PyPersPicklerTests):
        pickler = _pickle.Pickler
        unpickler = _pickle.Unpickler

    class CDumpPickle_LoadPickle(PyPicklerTests):
        pickler = _pickle.Pickler
        unpickler = pickle._Unpickler

    class DumpPickle_CLoadPickle(PyPicklerTests):
        pickler = pickle._Pickler
        unpickler = _pickle.Unpickler

    class CPicklerUnpicklerObjectTests(AbstractPicklerUnpicklerObjectTests):
        pickler_class = _pickle.Pickler
        unpickler_class = _pickle.Unpickler

        def test_issue18339(self):
            unpickler = self.unpickler_class(io.BytesIO())
            with self.assertRaises(TypeError):
                unpickler.memo = object
            # used to cause a segfault
            with self.assertRaises(ValueError):
                unpickler.memo = {-1: None}
            unpickler.memo = {1: None}

    class CDispatchTableTests(AbstractDispatchTableTests):
        pickler_class = pickle.Pickler
        def get_dispatch_table(self):
            return pickle.dispatch_table.copy()

    class CChainDispatchTableTests(AbstractDispatchTableTests):
        pickler_class = pickle.Pickler
        def get_dispatch_table(self):
            return collections.ChainMap({}, pickle.dispatch_table)

    @support.cpython_only
    class SizeofTests(unittest.TestCase):
        check_sizeof = support.check_sizeof

        def test_pickler(self):
            basesize = support.calcobjsize('5P2n3i2n3iP')
            p = _pickle.Pickler(io.BytesIO())
            self.assertEqual(object.__sizeof__(p), basesize)
            MT_size = struct.calcsize('3nP0n')
            ME_size = struct.calcsize('Pn0P')
            check = self.check_sizeof
            check(p, basesize +
                MT_size + 8 * ME_size +  # Minimal memo table size.
                sys.getsizeof(b'x'*4096))  # Minimal write buffer size.
            for i in range(6):
                p.dump(chr(i))
            check(p, basesize +
                MT_size + 32 * ME_size +  # Size of memo table required to
                                          # save references to 6 objects.
                0)  # Write buffer is cleared after every dump().

        def test_unpickler(self):
            basesize = support.calcobjsize('2Pn2P 2P2n2i5P 2P3n6P2n2i')
            unpickler = _pickle.Unpickler
            P = struct.calcsize('P')  # Size of memo table entry.
            n = struct.calcsize('n')  # Size of mark table entry.
            check = self.check_sizeof
            for encoding in 'ASCII', 'UTF-16', 'latin-1':
                for errors in 'strict', 'replace':
                    u = unpickler(io.BytesIO(),
                                  encoding=encoding, errors=errors)
                    self.assertEqual(object.__sizeof__(u), basesize)
                    check(u, basesize +
                             32 * P +  # Minimal memo table size.
                             len(encoding) + 1 + len(errors) + 1)

            stdsize = basesize + len('ASCII') + 1 + len('strict') + 1
            def check_unpickler(data, memo_size, marks_size):
                dump = pickle.dumps(data)
                u = unpickler(io.BytesIO(dump),
                              encoding='ASCII', errors='strict')
                u.load()
                check(u, stdsize + memo_size * P + marks_size * n)

            check_unpickler(0, 32, 0)
            # 20 is minimal non-empty mark stack size.
            check_unpickler([0] * 100, 32, 20)
            # 128 is memo table size required to save references to 100 objects.
            check_unpickler([chr(i) for i in range(100)], 128, 20)
            def recurse(deep):
                data = 0
                for i in range(deep):
                    data = [data, data]
                return data
            check_unpickler(recurse(0), 32, 0)
            check_unpickler(recurse(1), 32, 20)
            check_unpickler(recurse(20), 32, 58)
            check_unpickler(recurse(50), 64, 58)
            check_unpickler(recurse(100), 128, 134)

            u = unpickler(io.BytesIO(pickle.dumps('a', 0)),
                          encoding='ASCII', errors='strict')
            u.load()
            check(u, stdsize + 32 * P + 2 + 1)


ALT_IMPORT_MAPPING = {
    ('_elementtree', 'xml.etree.ElementTree'),
    ('cPickle', 'pickle'),
    ('StringIO', 'io'),
    ('cStringIO', 'io'),
}

ALT_NAME_MAPPING = {
    ('__builtin__', 'basestring', 'builtins', 'str'),
    ('exceptions', 'StandardError', 'builtins', 'Exception'),
    ('UserDict', 'UserDict', 'collections', 'UserDict'),
    ('socket', '_socketobject', 'socket', 'SocketType'),
}

def mapping(module, name):
    if (module, name) in NAME_MAPPING:
        module, name = NAME_MAPPING[(module, name)]
    elif module in IMPORT_MAPPING:
        module = IMPORT_MAPPING[module]
    return module, name

def reverse_mapping(module, name):
    if (module, name) in REVERSE_NAME_MAPPING:
        module, name = REVERSE_NAME_MAPPING[(module, name)]
    elif module in REVERSE_IMPORT_MAPPING:
        module = REVERSE_IMPORT_MAPPING[module]
    return module, name

def getmodule(module):
    try:
        return sys.modules[module]
    except KeyError:
        try:
            __import__(module)
        except AttributeError as exc:
            if support.verbose:
                print("Can't import module %r: %s" % (module, exc))
            raise ImportError
        except ImportError as exc:
            if support.verbose:
                print(exc)
            raise
        return sys.modules[module]

def getattribute(module, name):
    obj = getmodule(module)
    for n in name.split('.'):
        obj = getattr(obj, n)
    return obj

def get_exceptions(mod):
    for name in dir(mod):
        attr = getattr(mod, name)
        if isinstance(attr, type) and issubclass(attr, BaseException):
            yield name, attr

class CompatPickleTests(unittest.TestCase):
    def test_import(self):
        modules = set(IMPORT_MAPPING.values())
        modules |= set(REVERSE_IMPORT_MAPPING)
        modules |= {module for module, name in REVERSE_NAME_MAPPING}
        modules |= {module for module, name in NAME_MAPPING.values()}
        for module in modules:
            try:
                getmodule(module)
            except ImportError:
                pass

    def test_import_mapping(self):
        for module3, module2 in REVERSE_IMPORT_MAPPING.items():
            with self.subTest((module3, module2)):
                try:
                    getmodule(module3)
                except ImportError:
                    pass
                if module3[:1] != '_':
                    self.assertIn(module2, IMPORT_MAPPING)
                    self.assertEqual(IMPORT_MAPPING[module2], module3)

    def test_name_mapping(self):
        for (module3, name3), (module2, name2) in REVERSE_NAME_MAPPING.items():
            with self.subTest(((module3, name3), (module2, name2))):
                if (module2, name2) == ('exceptions', 'OSError'):
                    attr = getattribute(module3, name3)
                    self.assertTrue(issubclass(attr, OSError))
                else:
                    module, name = mapping(module2, name2)
                    if module3[:1] != '_':
                        self.assertEqual((module, name), (module3, name3))
                    try:
                        attr = getattribute(module3, name3)
                    except ImportError:
                        pass
                    else:
                        self.assertEqual(getattribute(module, name), attr)

    def test_reverse_import_mapping(self):
        for module2, module3 in IMPORT_MAPPING.items():
            with self.subTest((module2, module3)):
                try:
                    getmodule(module3)
                except ImportError as exc:
                    if support.verbose:
                        print(exc)
                if ((module2, module3) not in ALT_IMPORT_MAPPING and
                    REVERSE_IMPORT_MAPPING.get(module3, None) != module2):
                    for (m3, n3), (m2, n2) in REVERSE_NAME_MAPPING.items():
                        if (module3, module2) == (m3, m2):
                            break
                    else:
                        self.fail('No reverse mapping from %r to %r' %
                                  (module3, module2))
                module = REVERSE_IMPORT_MAPPING.get(module3, module3)
                module = IMPORT_MAPPING.get(module, module)
                self.assertEqual(module, module3)

    def test_reverse_name_mapping(self):
        for (module2, name2), (module3, name3) in NAME_MAPPING.items():
            with self.subTest(((module2, name2), (module3, name3))):
                try:
                    attr = getattribute(module3, name3)
                except ImportError:
                    pass
                module, name = reverse_mapping(module3, name3)
                if (module2, name2, module3, name3) not in ALT_NAME_MAPPING:
                    self.assertEqual((module, name), (module2, name2))
                module, name = mapping(module, name)
                self.assertEqual((module, name), (module3, name3))

    def test_exceptions(self):
        self.assertEqual(mapping('exceptions', 'StandardError'),
                         ('builtins', 'Exception'))
        self.assertEqual(mapping('exceptions', 'Exception'),
                         ('builtins', 'Exception'))
        self.assertEqual(reverse_mapping('builtins', 'Exception'),
                         ('exceptions', 'Exception'))
        self.assertEqual(mapping('exceptions', 'OSError'),
                         ('builtins', 'OSError'))
        self.assertEqual(reverse_mapping('builtins', 'OSError'),
                         ('exceptions', 'OSError'))

        for name, exc in get_exceptions(builtins):
            with self.subTest(name):
                if exc in (BlockingIOError,
                           ResourceWarning,
                           StopAsyncIteration,
                           RecursionError):
                    continue
                if exc is not OSError and issubclass(exc, OSError):
                    self.assertEqual(reverse_mapping('builtins', name),
                                     ('exceptions', 'OSError'))
                else:
                    self.assertEqual(reverse_mapping('builtins', name),
                                     ('exceptions', name))
                    self.assertEqual(mapping('exceptions', name),
                                     ('builtins', name))

    def test_multiprocessing_exceptions(self):
        module = support.import_module('multiprocessing.context')
        for name, exc in get_exceptions(module):
            with self.subTest(name):
                self.assertEqual(reverse_mapping('multiprocessing.context', name),
                                 ('multiprocessing', name))
                self.assertEqual(mapping('multiprocessing', name),
                                 ('multiprocessing.context', name))


def test_main():
    tests = [PickleTests, PyUnpicklerTests, PyPicklerTests, PyPersPicklerTests,
             PyDispatchTableTests, PyChainDispatchTableTests,
             CompatPickleTests]
    if has_c_implementation:
        tests.extend([CUnpicklerTests, CPicklerTests, CPersPicklerTests,
                      CDumpPickle_LoadPickle, DumpPickle_CLoadPickle,
                      PyPicklerUnpicklerObjectTests,
                      CPicklerUnpicklerObjectTests,
                      CDispatchTableTests, CChainDispatchTableTests,
                      InMemoryPickleTests, SizeofTests])
    support.run_unittest(*tests)
    support.run_doctest(pickle)

if __name__ == "__main__":
    test_main()
