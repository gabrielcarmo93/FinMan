import React, { Component } from 'react'
import { Container, HeaderBar, Body, Bills, AdvOptions, Balance, LessCategory, PlusCategory, BillsDashBoard, BillsHeader, PlusHeader, LessHeader, PlusBoard, LessBoard, NoRegistredCategory, BoardItem, BillValue, BillTitle } from './styles'
import { Button, Select, Radio, Form, Modal, Icon, Input } from 'semantic-ui-react'
import IconGroup from '../../components/IconGroup'
import logo from '../../assets/logo/twitter_header_photo_1.png'
import moment from 'moment'
import api from '../../services/api'
import auth from '../../auth'
import { history } from '../../helpers/history'
import InputMask from 'react-input-mask'
import CurrencyInput from 'react-currency-input'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Home extends Component {
    state = {
        balance: 0.00,
        categoriaMovimentação: undefined,
        billValue: 0,
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
                this.getMovimentacoes()

            } else {
                toast.error('Erro ao conectar')
                auth.deauthenticateUser()
                history.push('/login')
            }

        } catch(err) {
            auth.deauthenticateUser()
            history.push('/login')
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

    async getMovimentacoes() {
        const response = await api.get(`/gastosByOwner/${this.state.user.id}`)

        const data = []

        const movimentacoes = response.data
        const despesas = this.state.despesas
        const receitas = this.state.receitas
        // console.log(response.data)
        movimentacoes.forEach(function(el0, i0, all0) {
            if(el0.type === 'out') {
                despesas.forEach(function(el1, i1, all1) {
                    if(el0.category === el1.id) {
                        // console.log(el0, el1)

                        const obj = {
                            category: el0.category,
                            created_at: el0.created_at,
                            date: el0.created_at,
                            id: el0.id,
                            idOwner: el0.idOwner,
                            name: el0.name,
                            type: el0.type,
                            updated_at: el0.updated_at,
                            value: el0.value,
                            icon: el1.icon,
                            categoryName: el1.name
                        }

                        data.push(obj)
                    }
                })
            } else {
                receitas.forEach(function(el1, i1, all1) {
                    if(el0.category === el1.id) {
                        // console.log(el0, el1)

                        const obj = {
                            category: el0.category,
                            created_at: el0.created_at,
                            date: el0.created_at,
                            id: el0.id,
                            idOwner: el0.idOwner,
                            name: el0.name,
                            type: el0.type,
                            updated_at: el0.updated_at,
                            value: el0.value,
                            icon: el1.icon,
                            categoryName: el1.name
                        }

                        data.push(obj)
                    }
                })
            }
        })

        this.setState({ movimentacoes: data })
    }

    getBalance() {
        
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
            this.setState({ showModal: false })
            toast.success("Registrado com Sucesso")
            this.getReceitas()
            this.setState({ showModal: undefined })
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
            this.setState({ showModal: false })
            toast.success('Registrado com sucesso')
            this.getDespesas()
            this.setState({ showModal: undefined })
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

    registerBill = async () => {
        var type

        (this.state.categoriaMovimentação === 'despesa') ? type = 'out' : type = 'in'

        if(moment(this.state.movimentacaoDate, 'DD/MM/YYYY', true).isValid()) {
            const bill = {
                name: this.state.movimentacaoName,
                date: moment(this.state.movimentacaoDate,'DD/MM/YYYY').format(),
                category: this.state.movimentacaooGroup,
                type: type,
                value: this.state.movimentacaoValue,
                idOwner: this.state.user.id
            }
    
            const response = await api.post('/gasto', bill)

            if(response.status === 200) {
                this.setState({ showModal: false })
                toast.success('Registrado com sucesso')
                this.getMovimentacoes()
                this.setState({ showModal: undefined })

            }
        }

    }
    render() {
        return (
            <Container>
                <HeaderBar>
                    <img src={logo} alt='FinMan' />
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

                            <Modal size='tiny' open={this.state.showModal} dimmer='blurring' trigger={
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
                                                    value={this.state.billValue}
                                                    onChangeEvent={(event, maskedvalue, floatvalue) => this.setState({ [event.target.name]: floatvalue, billValue: maskedvalue})}
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
                                                name="movimentacaooGroup"
                                                options={this.createOptions()}
                                                onChange={(e, data) => this.setState({ [data.name]: data.value }) }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Button
                                                primary
                                                fluid
                                                onClick={this.registerBill}
                                            >
                                                Registrar
                                                </Button>
                                        </Form.Field>
                                    </Form>
                                </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </BillsHeader>
                        <BillsDashBoard>
                            {
                                (this.state.movimentacoes) ? 
                                    this.state.movimentacoes.map(
                                        movimentacao => (
                                            <BoardItem key={movimentacao.id}>
                                                <div className={movimentacao.type}>

                                                        <BillValue>
                                                            {
                                                                (movimentacao.type==='in') ? <Icon name={movimentacao.icon} /> : ''
                                                            }
                                                            R$ {movimentacao.value.toString().replace('.',',')}
                                                            {
                                                                (movimentacao.type==='out') ? <Icon name={movimentacao.icon} /> : ''
                                                            }
                                                        </BillValue>
                                                        <BillTitle>{movimentacao.name} </BillTitle>
                                                </div>
                                            </BoardItem>
                                        )
                                    )
                                : (
                                    <span>Nenhuma movimentação registrada</span>
                                )
                            }
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
                                <Modal size='tiny' open={this.state.showModal} trigger={
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
                                <Modal size='tiny' open={this.state.showModal} trigger={
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

export default Home