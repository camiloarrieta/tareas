import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      Nombres: '',
      Apellidos: '',
      Cedula: '',
      Dirección: '',
      Celular: '',
      _id: '',
      datos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addDato = this.addDato.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addDato(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/datos/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          Nombres: this.state.Nombres,
          Apellidos: this.state.Apellidos,
          Cedula: this.state.Cedula,
          Dirección: this.state.Dirección,
          Celular: this.state.Celular,
          

        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Dato Updated'});
          this.setState({_id: '', Nombres: '', Apellidos: '', Cedula: '', Dirección: '', Celular: ''});
          this.fetchDatos();
        });
    } else {
      fetch('/api/datos', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Dato Saved'});
          this.setState({Nombres: '', Apellidos: '', Cedula: '', Dirección: '', Celular: ''});
          this.fetchDatos();
        })
        .catch(err => console.error(err));
    }

  }

  deleteDato(id) {
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/datos/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Dato deleted'});
          this.fetchDatos();
        });
    }
  }

  editDato(id) {
    fetch(`/api/datos/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          Nombres: data.Nombres,
          Apellidos: data.Apellidos,
          Cedula: data.Cedula,
          Dirección: data.Dirección,
          Celular: data.Celular,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchDatos();
  }

  fetchDatos() {
    fetch('/api/datos')
      .then(res => res.json())
      .then(data => {
        this.setState({datos: data});
        console.log(this.state.datos);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="cian oscuro-1">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">INFORMACION PERSONAL</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addDato}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="Nombres" onChange={this.handleChange} value={this.state.Nombres} type="text" placeholder="Nombres" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="Apellidos" onChange={this.handleChange} value={this.state.Apellidos} cols="30" rows="10" placeholder="Apellidos" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="Cedula" onChange={this.handleChange} value={this.state.Cedula} cols="30" rows="10" placeholder="Cedula" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="Dirección" onChange={this.handleChange} value={this.state.Dirección} cols="30" rows="10" placeholder="Dirección" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="Celular" onChange={this.handleChange} value={this.state.Celular} cols="30" rows="10" placeholder="Celular" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn acento rojo-4">
                      GUARDAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Cedula</th>
                    <th>Dirección</th>
                    <th>Celular</th>
                    
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.datos.map(dato => {
                      return (
                        <tr key={dato._id}>
                          <td>{dato.Nombres}</td>
                          <td>{dato.Apellidos}</td>
                          <td>{dato.Cedula}</td>
                          <td>{dato.Dirección}</td>
                          <td>{dato.Celular}</td>

                          <td>
                            <button onClick={() => this.deleteDato(dato._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editDato(dato._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;