import React, { Component } from 'react';

import api from '../../services/api'
import { Container, HeaderBar, Body } from './styles'
import Auth from '../../auth'
import logo from '../../assets/logo/twitter_header_photo_1.png'
import landingImage from '../../assets/financial.png'
import { Button, Input, Header } from 'semantic-ui-react'
import { history } from '../../helpers/history'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Login extends Component {
	state = {
		register: false,
	}

	componentDidMount() {
		if (Auth.getToken()){
			console.log('Tem token')
			history.push('/')
		}
	}

	submitLogin = async (e) => {
		e.preventDefault();
		const data = {
			email: this.state.loginEmail,
			password: this.state.loginPassword
		}

		try {
			const user = await api.post('/authenticate', data)
			Auth.authenticateUser(user.data.token, data.email)
			history.push('/')
			
		} catch (err) {
			if(!err.response)
				toast.warning("Erro ao conectar com o servidor");
			else  {
				if(err.response.status === 401)
					toast.error("Usuário não encontrado!");
			}
				
		}
	}

	registerLogin = async (e) => {
		e.preventDefault()
		const data = {
			username: this.state.registerFirstName.toLowerCase().charAt(0).toUpperCase() + this.state.registerFirstName.toLowerCase().slice(1) +' '+this.state.registerLastName.toLowerCase().charAt(0).toUpperCase() + this.state.registerLastName.toLowerCase().slice(1),
			email: this.state.registerEmail,
			password: this.state.registerFirstPassword
		}


		try {
			await api.post('/user', data)

			try {

				data.username = undefined
				const user = await api.post('/authenticate', data)
				Auth.authenticateUser(user.data.token, data.email)
				history.push('/')
				
			} catch (err) {
				alert(err.response.statusText)
			}
		} catch (err) {
			alert(err.response.statusText)
		}
	}

	render() {
		return (
			<Container>
				<HeaderBar>
					<img src={logo} alt="FinMan"/>
					<div>
						<span>Login</span>
						<div id="inputGroup">
							<form onSubmit={this.submitLogin}>
								<Input
									placeholder="Email"
									type="email"
									icon="at"
									iconPosition="left"
									size="mini"
									name="loginEmail"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									required
								/>

								<Input
									placeholder="Senha"
									type="password"
									icon="key"
									iconPosition="left"
									size="mini"
									name="loginPassword"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									required
								/>

								<Button size="small" color="teal">Entrar</Button>
							</form>
						</div>
					</div>
				</HeaderBar>
				<Body>
					<div id="landing">
						<Header as='h1'>FinMan</Header>
						<p>
							Idealizado pela necessidade de organizar sua vida financeira. O FinMan atende todos os seus controles de registros de entradas e saídas financeiras, para proporcionar a você um maior controle sobre suas atividades e gastos.
						</p>
						<img src={landingImage} alt="FinMan" />
					</div>
					<div id="register">
						<span>Cadastre-se, é rápido, fácil e gratuito</span>
						<form id="registerFormWrapper" onSubmit={this.registerLogin}>
							<div id="doubleInput">
								<Input
									size="small"
									id="firstname"
									placeholder="Nome"
									name="registerFirstName"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									fluid
									required
								/>

								<Input
									size="small"
									id="lastname"
									placeholder="Sobrenome"
									name="registerLastName"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									fluid
									required
								/>
							</div>

							<div>
								<Input
									size="small"
									type="email"
									placeholder="Email"
									name="registerEmail"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									fluid
									required
								/>
							</div>

							<div id="doubleInput">
								<Input
									size="small"
									type="password"
									id="firstpassword"
									placeholder="Senha"
									name="registerFirstPassword"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									fluid
									required
								/>

								<Input
									size="small"
									type="password"
									id="repeatpassword"
									placeholder="Repita a Senha"
									name="registerRepeatPassword"
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									fluid
									required
								/>
							</div>

							<Button color="teal" fluid>Cadastrar</Button>
						</form>
					</div>
				</Body>
			<ToastContainer
				position="bottom-right"
				autoClose={3500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnVisibilityChange
				draggable
				pauseOnHover
			/>
			</Container>
		)
	}
}

export default Login