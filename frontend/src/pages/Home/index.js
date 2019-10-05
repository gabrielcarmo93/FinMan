import React, { Component } from 'react'
import { Container, HeaderBar, Body, Bills, AdvOptions, Balance, LessCategory, PlusCategory } from './styles'

class Home extends Component {
    state = {
        balance: 0.00,
    }
    render() {
        return (
            <Container>
                <HeaderBar>

                </HeaderBar>
                <Body>
                    <Bills>
                        <span>
                            Olá, {this.state.username}.
                            {
                                (moment('H') > 0 && moment('H') < 12) ? 'Bom dia'
                                :
                                (moment('H') >= 12 && moment('H') < 18) ? 'Boa tarde' : 'Boa noite'
                            }
                        </span>

                    </Bills>
                    <AdvOptions>
                        <Balance>
                            <h1>R$ 0,00</h1>
                            <sup>Saldo do período</sup>
                        </Balance>

                        <PlusCategory>
                            <legend>Categorias de Receitas</legend>
                        </PlusCategory>

                        <LessCategory>

                        </LessCategory>
                    </AdvOptions>
                </Body>
            </Container>
        )
    }
}

export default Home