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

let _this

class Home extends Component {
    state = {
        balance: 0.00,
        bills: [],
        transactions: [],
        transactionCategories: [],
        transactionCategory: 'out',
        startDate: moment().subtract(30, 'days').format(),
        endDate: moment().format()
    }

    componentWillMount() {
        this.getUserByMail()
    }
    
    componentDidMount() {
        _this = this
        setTimeout(
            function() {
                _this.arrangeEverything()
            }
        ,1000)
    }

    async getUserByMail() {
        try {
            const response = await api.get(`user/${auth.getUserEmail()}`)
    
            if(response.data.length > 0) {
                delete response.data[0].password
                this.setState({ user: response.data[0]})

                this.getTransactionCategories()
                this.getTransactions()

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

    async getTransactionCategories() {
        const response = await api.get(`/transactionCategoryByOwner/${this.state.user.id}`)

        if(response.data.length > 0)
            this.setState({ transactionCategories: response.data })
    }
    
    async getTransactions() {
        const response = await api.get(`/transactionsByOwner/${this.state.user.id}/${this.state.startDate}/${this.state.endDate}`)

        if(response.data.length > 0)
            this.setState({ transactions: response.data })
    }

    async arrangeEverything() {
        const data = []
        const transactions = this.state.transactions
        const transactionCategories = this.state.transactionCategories

        transactions.forEach(function(el0, i0, all0) {
            transactionCategories.forEach(function(el1, i1, all1) {
                if(el0.idTransactionCategory === el1.id) {
                    const obj = {
                        category: el0.idTransactionCategory,
                        created_at: el0.created_at,
                        date: el0.created_at,
                        id: el0.id,
                        idOwner: el0.idOwner,
                        name: el0.name,
                        type: el1.type,
                        updated_at: el0.updated_at,
                        value: el0.value,
                        icon: el1.icon,
                        categoryName: el1.name
                    }

                    data.push(obj)
                }
            })
        })

        this.setState({ bills: data })
        this.getBalance()
    }

    async getBalance() {
        var plus = parseFloat(0)
        var minus = parseFloat(0)

        this.state.bills.forEach(function(el, i, all) {
            if(el.type==='in'){
                plus += parseFloat(el.value)
            }

            if(el.type==='out') {
                minus += parseFloat(el.value)
            }
        })

        const result = (plus-minus).toFixed(2)

        this.setState({ balance: result })
    }

    setTransactionCategory = async () => {
        const data = {
            idOwner: this.state.user.id,
            name: this.state.categoryName,
            type: this.state.categoryType,
            icon: localStorage.getItem('@FinMan/currentIcon')
        }

        console.log(data)

        localStorage.removeItem('@FinMan/currentIcon')

        const response = await api.post('/transactionCategory', data)

        if(response.status === 200) {
            this.setState({ showModal: false })
            toast.success("Registrado com Sucesso")
            this.getTransactionCategories()
            this.setState({ showModal: undefined })
        }
    }


    createOptions() {
        
        var options = []

        if(this.state.transactionCategory === 'in') {
            this.state.transactionCategories.map(
                transaction => {
                    if(transaction.type==='in') {
                        const obj = {
                            key: transaction.id,
                            value: transaction.id,
                            text: transaction.name
                        }
        
                        options.push(obj)
                        return true
                    }
                }
            )
        }
        
        if(this.state.transactionCategory === 'out') {
            this.state.transactionCategories.map(
                transaction => {
                    if(transaction.type==='out') {
                        const obj = {
                            key: transaction.id,
                            value: transaction.id,
                            text: transaction.name
                        }
        
                        options.push(obj)
                        return true
                    }
                }
            )
        }

        return options
    }

    setTransaction = async () => {
        // var type

        // (this.state.transactionGroup === 'out') ? type = 'out' : type = 'in'

        if(moment(this.state.transactionDate, 'DD/MM/YYYY', true).isValid()) {
            const transaction = {
                idOwner: this.state.user.id,
                name: this.state.transactionName,
                date: moment(this.state.transactionDate,'DD/MM/YYYY').format(),
                idTransactionCategory: this.state.transactionGroup,
                value: this.state.transactionValue,
            }
    
            const response = await api.post('/transaction', transaction)

            if(response.status === 200) {
                this.setState({ showModal: false })
                toast.success('Registrado com sucesso')
                this.getTransactions()
                this.setState({ showModal: undefined })

            } else {
                alert('erro')
                console.log(response)
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
                            <div>
                            <Modal size='mini' open={this.state.showModal} trigger={<Icon name='filter' style={{cursor: 'pointer', marginRight: '10px'}}/>}>
                                <Modal.Header>Escolha o Período</Modal.Header>
                                <Modal.Content>
                                '    <Modal.Description>
                                        <Form>
                                            <Form.Field>
                                                <label>Início</label>
                                                <InputMask
                                                    name="startDate"
                                                    mask="99/99/9999"
                                                    onChange={e => this.setState({ [e.target.name]: moment(e.target.value,'DD/MM/YYYY').format() })}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Fim</label>
                                                <InputMask
                                                    name="endDate"
                                                    mask="99/99/9999"
                                                    onChange={e => this.setState({ [e.target.name]: moment(e.target.value,'DD/MM/YYYY').format() })}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Button
                                                    primary
                                                    fluid
                                                    onClick={() => this.getMovimentacoes()}
                                                >
                                                    Filtrar
                                                </Button>
                                            </Form.Field>
                                        </Form>
                                        
                                    </Modal.Description>'
                                </Modal.Content>
                            </Modal>

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
                                                    name="transactionName"
                                                    onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>Valor</label>
                                                <Input iconPosition='left' placeholder='Valor'>
                                                    <Icon name='dollar' />
                                                    <CurrencyInput
                                                        name="transactionValue"
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
                                                        name="transactionDate"
                                                        mask="99/99/9999"
                                                        onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                                    />
                                                    
                                                </Input>
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Receita'
                                                    name='transactionCategory'
                                                    value='in'
                                                    checked={this.state.transactionCategory === 'in'}
                                                    onChange={e=> this.setState({ transactionCategory: 'in'})}
                                                    style={{marginRight: '10px'}}
                                                />
                                                <Radio
                                                    label='Despesa'
                                                    name='transactionCategory'
                                                    value='out'
                                                    checked={this.state.transactionCategory === 'out'}
                                                    onChange={e=> this.setState({ transactionCategory: 'out'})}
                                                    style={{marginLeft: '10px'}}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Select
                                                    placeholder="Selecione a Categoria"
                                                    name="transactionGroup"
                                                    options={this.createOptions()}
                                                    onChange={(e, data) => this.setState({ [data.name]: data.value }) }
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Button
                                                    primary
                                                    fluid
                                                    onClick={this.setTransaction}
                                                >
                                                    Registrar
                                                    </Button>
                                            </Form.Field>
                                        </Form>
                                    </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </div>
                        </BillsHeader>
                        <BillsDashBoard>
                            {
                                (this.state.bills.length > 0) ? 
                                    this.state.bills.map(
                                        bill => (
                                            <BoardItem key={bill.id}>
                                                <div className={bill.type}>

                                                        <BillValue>
                                                            {
                                                                (bill.type==='in') ? <Icon name={bill.icon} /> : ''
                                                            }
                                                            R$ {bill.value.toString().replace('.',',')}
                                                            {
                                                                (bill.type==='out') ? <Icon name={bill.icon} /> : ''
                                                            }
                                                        </BillValue>
                                                        <BillTitle>{bill.name} - {moment(bill.date).format('DD/MM/YYYY')}</BillTitle>
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
                            {
                                (this.state.balance > 0) ? (
                                    <h1 style={{color: 'blue'}}>R$ {this.state.balance.toString().replace('.',',')}</h1>
                                ) : (
                                    <h1 style={{color: 'red'}}>R$ {this.state.balance.toString().replace('.',',')}</h1>
                                )
                            }
                            <sup>Saldo do período {moment(this.state.startDate).format('DD/MM/YYYY')} a {moment(this.state.endDate).format('DD/MM/YYYY')}</sup>
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
                                            name="categoryName"
                                            onChange={e => this.setState({ [e.target.name]: e.target.value, categoryType: 'in' })}
                                        />
                                        <legend style={{marginTop: '10px'}}>Escolha um ícone para a categoria</legend>
                                        <IconGroup />
                                        <Button
                                            primary
                                            fluid
                                            onClick={this.setTransactionCategory}
                                        >
                                            Cadastrar
                                        </Button>
                                    </Modal.Content>
                                </Modal>

                            </PlusHeader>
                            <PlusBoard>
                                {
                                    this.state.transactionCategories ? (
                                        this.state.transactionCategories.map(
                                            transactionCategory => {
                                                return (transactionCategory.type === 'in') ? (
                                                        <Button
                                                            icon
                                                            labelPosition='left'
                                                            basic
                                                            color='green'
                                                            key={transactionCategory.id}
                                                            style={{boxingSizing: 'borderBox', margin: '2px'}}
                                                            size='mini'
                                                        >
                                                            <Icon name={transactionCategory.icon} />
                                                            {transactionCategory.name}
                                                        </Button>
                                                    ) : false
                                            }
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
                                            name="categoryName"
                                            onChange={e => this.setState({ [e.target.name]: e.target.value, categoryType: 'out' })}
                                        />
                                        <legend style={{marginTop: '10px'}}>Escolha um ícone para a categoria</legend>
                                        <IconGroup />
                                        <Button
                                            primary
                                            fluid
                                            onClick={this.setTransactionCategory}
                                        >
                                            Cadastrar
                                        </Button>
                                    </Modal.Content>
                                </Modal>
                            </LessHeader>
                            <LessBoard>
                                {
                                    this.state.transactionCategories ? (
                                        this.state.transactionCategories.map(
                                            transactionCategory => {
                                                return (transactionCategory.type === 'out') ? (
                                                        <Button
                                                            icon
                                                            labelPosition='left'
                                                            basic
                                                            color='red'
                                                            key={transactionCategory.id}
                                                            style={{boxingSizing: 'borderBox', margin: '2px'}}
                                                            size='mini'
                                                        >
                                                            <Icon name={transactionCategory.icon} />
                                                            {transactionCategory.name}
                                                        </Button>
                                                    ) : false
                                            }
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