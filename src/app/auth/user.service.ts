export class UserService {

  username: string = null
  f_name: string = null
  l_name: string = null
  session_token: string = null

  constructor(data) {

    var attributes = data["attributes"]

    for (var i = 0; i < attributes.length; i++) {
      var value = attributes[i]["values"][0]

      switch(data[i]["name"]) {
        case "SHIB_NAME_FIRST": {
          this.setFirstName(value)
          break;
        }
        case "SHIB_NAME_LAST": {
          this.setLastName(value)
          break;
        }
        case "SHIB_USERID": {
          this.setUsername(value)
          break;
        }
        case "Shib_Session_ID": {
          this.setToken(value)
          break;
        }
      }       
    }
  }

  setUsername(username:string) {
    this.username = username
  }

  setFirstName(f_name:string) {
    this.f_name = f_name
  }

  setLastName(l_name:string){
    this.l_name = l_name
  }

  setToken(token:string) {
    this.session_token = token
  }


  getUser(){
    return {
      username: this.username,
      f_name: this.f_name,
      l_name: this.l_name,
      session: this.session_token
    }
  }

}