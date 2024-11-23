import { Categories } from "./Categories";
import "./Servers.css"
import {Component, useRef, useEffect, useState} from 'react'


export class Server extends Component {
    constructor(props) {
        super(props);
        this.server_name = "New Server";
        this.categories = new Categories(props);
    }
    setServerName(server_name) { 
        this.text = text;
        this.categories.changeServerName(server_name);
    }
    render(props) {
        return (
            <div className='server'>
                {this.categories.render()}
            </div>
        )
    }
    renderServerSelectInfo() {
        return (
            <div className='server_select_info'>
                hiiii;
            </div>
        )
    }
}

export class Servers extends Component {
    constructor(props) {
        super(props);
        this.servers = [new Server(props)];
        this.current_server = this.servers[0];
    }
    addServer(server) {
        this.servers.push(server);
    }
    getServerSelectInfo() {
        const server_select_info = [];
        for (const server of this.servers) server_select_info.push(server.renderServerSelectInfo());
        return server_select_info;
    }
    render(props) {
        return (
            <>
            <div className='servers'>
                {this.getServerSelectInfo()}
            </div>
            {this.current_server.render()}
            </>
        )
    }
}