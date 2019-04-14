import React, { Component } from 'react';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

import "./styles.css";

// a logo vira variavel

export default class main extends Component {

//  estado do react eh uma variavel/objeto que eh armazenado na propria classe
  state = {
    newBox: '',    
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('boxes', {
      // automaticamente convertido pra json
      title: this.state.newBox,
    });
    this.props.history.push(`/box/${response.data._id}`);
    // joga a tela para o arquivo criado ou seja box criado
  }

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt=""/>
                <input 
                  placeholder="Criar uma caixa"
                  value={this.state.newBox}
                  onChange={this.handleInputChange}
                 />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
