import React, { Component } from 'react'
import { Container, HeaderBar, Body, Bills, AdvOptions, Balance, LessCategory, PlusCategory, BillsDashBoard, BillsHeader, PlusHeader, LessHeader, PlusBoard, LessBoard, NoRegistredCategory } from './styles'
import { Button, Select, Radio, Form, Modal, Icon, Input } from 'semantic-ui-react'
import IconGroup from '../../components/IconGroup'
import moment from 'moment'
import api from '../../services/api'
import auth from '../../auth'
import { history } from '../../helpers/history'
import InputMask from 'react-input-mask'
import CurrencyInput from 'react-currency-input'

class Home extends Component {
    state = {
        balance: 0.00,
        categoriaMovimentação: undefined
    }

    componentDidMount() {
        this.getUserByMail()
    }

    async getUserByMail() {
        try {
            const response = await api.get(`user/${auth.getUserEmail()}`)
    
            if(response.data.length > 0) {
                response.data[0].password = undefined
                this.setState({ user: response.data[0]})

                this.getReceitas()
                this.getDespesas()

            } else {
                alert('Erro ao conectar')
                auth.deauthenticateUser()
                history.push('/')
            }

        } catch(err) {
            console.log(err)
        }
    }

    async getReceitas() {
        const response = await api.get(`/categoriaDeReceitaByOwner/${this.state.user.id}`)

        if(response.data.length > 0)
            this.setState({ receitas: response.data })
    }

    async getDespesas() {
        const response = await api.get(`/categoriaDeGastoByOwner/${this.state.user.id}`)

        if(response.data.length > 0)
            this.setState({ despesas: response.data })
    }

    registerReceitaCategory = async () => {
        const data = {
            idOwner: this.state.user.id,
            name: this.state.receitaName,
            icon: localStorage.getItem('@FinMan/currentIcon')
        }

        localStorage.removeItem('@FinMan/currentIcon')

        const response = await api.post('/categoriaDeReceita', data)

        if(response.status === 200) {
            alert("Registrado com Sucesso")
        }
    }

    registerDespesaCategory = async () => {
        const data = {
            idOwner: this.state.user.id,
            name: this.state.despesaName,
            icon: localStorage.getItem('@FinMan/currentIcon')
        }
        
        localStorage.removeItem('@FinMan/currentIcon')

        const response = await api.post('/categoriaDeGasto', data)

        if(response.status === 200) {
            alert("Registrado com Sucesso")
        }
    }

    createOptions() {
        
        const options = []

        if(this.state.categoriaMovimentação === 'receita') {
            this.state.receitas.map(
                receita => {
                    const obj = {
                        key: receita.id,
                        value: receita.id,
                        text: receita.name
                    }
    
                    options.push(obj)
                    return true
                }
            )
        }

        if(this.state.categoriaMovimentação === 'despesa') {
            this.state.despesas.map(
                despesa => {
                    const obj = {
                        key: despesa.id,
                        value: despesa.id,
                        text: despesa.name
                    }
    
                    options.push(obj)
                    return true
                }
            )
        }

        return options

    }
    render() {
        return (
            <Container>
                <HeaderBar>

                </HeaderBar>
                <Body>
                    <Bills>
                        <BillsHeader>
                            <span>
                                Olá, { this.state.user ? this.state.user.username : '' }
                                {
                                    (moment().format('H') > 4 && moment().format('H') < 12) ? '. Bom dia!'
                                    :
                                    (moment().format('H') >= 12 && moment().format('H') < 18) ? '. Boa tarde!' : '. Boa noite!'
                                }
                            </span>

                            <Modal size='tiny' trigger={
                                <Button animated='fade'  onClick={() => this.createOptions()}>
                                <Button.Content visible>Adicionar Movimentação</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='plus' />
                                    </Button.Content>
                                </Button>
                            }>
                                <Modal.Header>Registrar movimentação</Modal.Header>
                                <Modal.Content>
                                <Modal.Description>
                                    <Form>
                                        <Form.Field>
                                            <label>Nome</label>
                                            <input
                                                name="movimentacaoName"
                                                onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Valor</label>
                                            <Input iconPosition='left' placeholder='Valor'>
                                                <Icon name='dollar' />
                                                <CurrencyInput
                                                    name="movimentacaoValue"
                                                    decimalSeparator=","
                                                    thousandSeparator="."
                                                    onChangeEvent={(event, maskedvalue, floatvalue) => this.setState({ [event.target.name]: floatvalue})}
                                                />
                                            </Input>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Data</label>
                                            <Input iconPosition='left' placeholder='Data'>
                                                <Icon name='calendar alternate outline' />
                                                <InputMask
                                                    name="movimentacaoDate"
                                                    mask="99/99/9999"
                                                    onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                                />
                                                
                                            </Input>
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='Receita'
                                                name='categoriaMovimentação'
                                                value='receita'
                                                checked={this.state.categoriaMovimentação === 'receita'}
                                                onChange={e=> this.setState({ categoriaMovimentação: 'receita'})}
                                                style={{marginRight: '10px'}}
                                            />
                                            <Radio
                                                label='Despesa'
                                                name='categoriaMovimentação'
                                                value='despesa'
                                                checked={this.state.categoriaMovimentação === 'despesa'}
                                                onChange={e=> this.setState({ categoriaMovimentação: 'despesa'})}
                                                style={{marginLeft: '10px'}}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Select
                                                placeholder="Selecione a Categoria"
                                                options={this.createOptions()}
                                                onChange={e => console.log(e)}
                                            />
                                        </Form.Field>
                                    </Form>
                                </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </BillsHeader>
                        <BillsDashBoard>

                        </BillsDashBoard>
                    </Bills>
                    <AdvOptions>
                        <Balance>
                            <h1>R$ 0,00</h1>
                            <sup>Saldo do período</sup>
                        </Balance>

                        <PlusCategory>
                            <PlusHeader>

                                <legend>Categorias de Receitas</legend>
                                <Modal size='tiny' trigger={
                                    <Button animated='fade' size='small'>
                                    <Button.Content visible>+ Receita</Button.Content>
                                        <Button.Content hidden>
                                            <Icon.Group>
                                                <Icon name='dollar' />
                                                <Icon corner name='plus' color='green'/>
                                            </Icon.Group>
                                        </Button.Content>
                                    </Button>
                                }>
                                    <Modal.Header>Criar categoria de Receita</Modal.Header>
                                    <Modal.Content>
                                        <legend>Defina um nome para a categoria</legend>
                                        <Input
                                            fluid
                                            placeholder="Ex: Conta de Luz"
                                            name="receitaName"
                                            onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                        />
                                        <legend style={{marginTop: '10px'}}>Escolha um ícone para a categoria</legend>
                                        <IconGroup />
                                        <Button
                                            primary
                                            fluid
                                            onClick={this.registerReceitaCategory}
                                        >
                                            Cadastrar
                                        </Button>
                                    </Modal.Content>
                                </Modal>

                            </PlusHeader>
                            <PlusBoard>
                                {
                                    this.state.receitas ? (
                                        this.state.receitas.map(
                                            receita => (
                                                <Button
                                                    icon
                                                    labelPosition='left'
                                                    basic
                                                    color='green'
                                                    key={receita.id}
                                                    style={{boxingSizing: 'borderBox', margin: '2px'}}
                                                    size='mini'
                                                >
                                                    <Icon name={receita.icon} />
                                                    {receita.name}
                                                </Button>
                                            )
                                        )

                                    ) : <NoRegistredCategory>Nenhuma categoria cadastrada</NoRegistredCategory>
                                }
                            </PlusBoard>
                        </PlusCategory>

                        <LessCategory>
                            <LessHeader>
                                <legend>Categorias de Despesas</legend>
                                <Modal size='tiny' trigger={
                                    <Button animated='fade' size='small'>
                                    <Button.Content visible>+ Despesa</Button.Content>
                                        <Button.Content hidden>
                                            <Icon.Group>
                                                <Icon name='dollar' />
                                                <Icon corner name='minus' color='red'/>
                                            </Icon.Group>
                                        </Button.Content>
                                    </Button>
                                }>
                                    <Modal.Header>Criar categoria de Despesa</Modal.Header>
                                    <Modal.Content>
                                        <legend>Defina um nome para a categoria</legend>
                                        <Input
                                            fluid
                                            placeholder="Ex: Salário"
                                            name="despesaName"
                                            onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                        />
                                        <legend style={{marginTop: '10px'}}>Escolha um ícone para a categoria</legend>
                                        <IconGroup />
                                        <Button
                                            primary
                                            fluid
                                            onClick={this.registerDespesaCategory}
                                        >
                                            Cadastrar
                                        </Button>
                                    </Modal.Content>
                                </Modal>
                            </LessHeader>
                            <LessBoard>
                            {
                                    this.state.despesas ? (
                                        this.state.despesas.map(
                                            despesa => (
                                                <Button
                                                    icon
                                                    labelPosition='left'
                                                    basic
                                                    color='red'
                                                    key={despesa.id}
                                                    style={{boxingSizing: 'borderBox', margin: '2px'}}
                                                    size='mini'
                                                >
                                                    <Icon name={despesa.icon} />
                                                    {despesa.name}
                                                </Button>
                                            )
                                        )

                                    ) : <NoRegistredCategory>Nenhuma categoria cadastrada</NoRegistredCategory>
                                }
                            </LessBoard>
                        </LessCategory>
                    </AdvOptions>
                </Body>
            </Container>
        )
    }
}

export default Home