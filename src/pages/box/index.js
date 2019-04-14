import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import api from "../../services/api";
import {MdInsertDriveFile} from 'react-icons/md';
import {distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import "./styles.css";
import socket from 'socket.io-client';
export default class box extends Component {
  state = {box:''};
  async componentDidMount(){
    this.subscribeToNewFiles();
    // desparado de forma automatica qd vai para a tela
    const box = this.props.match.params.id;
    // box carrega o id que foi criado
    const response = await api.get(`boxes/${box}`);
    // toda info que for manipular no componente guarda na variavel estado
    this.setState({ box: response.data});
  }
  subscribeToNewFiles = () =>{
    const box = this.props.match.params.id;
    const io = socket('https://kaiquestack-backend.herokuapp.com');

    io.emit('connectRoom', box);
    // agr toda as vezes que o usuario estiver numa sala ele dispara uma msg para todos
    io.on('file', data=> { 
      this.setState({ box: { ...this.state.box, files: [data,...this.state.box.files, ]}});
      // atualizar em tempo real !!! jesus 
    });
  }

  handleupload = (files) =>{
    files.forEach( file =>{
      const data = new FormData();
      const box = this.props.match.params.id;
      data.append('file', file);

      api.post(`boxes/${box}/files`, data);
    })
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt=""/>
          <h1>{this.state.box.title}</h1>
        </header>
        <Dropzone onDropAccepted={this.handleupload }>
          {/* o conteudo dele precisa ser funcao */}
          {({ getRootProps, getInputProps}) =>(
            <div className="uploads" {... getRootProps()}>
              <input {... getInputProps()} />
              <p> Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>
        {/* listagem de arquivo  ul melhor */}
        <ul>
          {/* no react da pra inserir js de qlqr tipo */}
          { this.state.box.files && this.state.box.files.map( file => (
            // faz o retorno de forma automatica  com () ao invez de {}
          <li key={file.id}>
            <a className="fileInfo" href={file.url} target="blank">
              <MdInsertDriveFile size={24} color="#a5cfff"/>
              <strong>{file.title}</strong>
            </a>
            <span>Há{" "}{distanceInWords(file.createdAt, new Date(), {locale:pt})}
            </span>
          </li>
          )) }
        </ul>
      </div>
    )
  }
}
