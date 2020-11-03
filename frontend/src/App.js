import React from 'react';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      users: [],
      user: {
        username: '',
        password: '',
      },
      newChange: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.getUsers()
  }
  componentDidUpdate() {
    if (this.state.newChange) this.getUsers()
  }
  handleUsernameChange(event) {
    this.setState({
      user: Object.assign(
        {}, 
        this.state.user, 
        {
        username: event.target.value
        }
      )
  });
  }
  getUsers() {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result', result)
          this.setState({
            isLoaded: true,
            users: result,
            newChange: false
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  handlePasswordChange(event) {
  
    this.setState({
      user: Object.assign(
        {}, 
        this.state.user, 
        {
        password: event.target.value
        }
      )
  });
  }
  handleSubmit() {
  
    const user = {
      password: this.state.user.password,
      username: this.state.user.username
    }
    console.log('user', user)
    const url = "http://localhost:8080/users"
    const userResponse = fetch(url, {
      method: 'POST',
      body: JSON.stringify(user)
    }).then((response) => {
      const json = response.json()
      console.log('first response json', json)
      return json
    }, (error)=> {
      console.log('error', error)
    }).then((json)=> {
      console.log('json', json)
      this.setState({
        newChange: true
      })
      return json
    })
    return userResponse
  }
  render() {
    const mystyle = {
      
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      'border-style': 'solid',
      width: "10em"
      
    };

    console.log('username', this.state.user.username)
    console.log('password', this.state.user.password)
    return (
      <div className="App">
        <form>
  <label>
    username:
    <input type="text" name="username" value={this.state.user.username} onChange={this.handleUsernameChange} />
  </label>
  <label>
    password:
    <input type="text" name="password" value={this.state.user.password} onChange={this.handlePasswordChange} />
  </label>
  <div style={mystyle} onClick={this.handleSubmit}>Create User</div>
</form>

        
  
        {this.state.users.map((user) => <div>{user.username}</div>)}
      </div>
    );  }
}


export default App;
