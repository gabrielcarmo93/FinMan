import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    background: #333;
    color: #ccc;
`

const Body = styled.div`
    height: calc(100% - 43px);
    display: grid;
    grid-template-columns: 5fr 2fr;

`

const Bills = styled.div`
    background: #333;
`

const AdvOptions = styled.div`
    display: grid;
    grid-template-rows: 2fr 3fr 3fr
`

const Balance = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #ccc;

    h1 {
        font-weight: 400;
        font-size: 3em
    }
`

const PlusCategory = styled.div`
    // border-top: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
`

const LessCategory = styled.div`
    background: #96d7a0;
`

const HeaderBar = styled.div`
    height: 43px;
    background: #ccc;
`


export { Container, HeaderBar, Body, Bills, AdvOptions, Balance, LessCategory, PlusCategory }