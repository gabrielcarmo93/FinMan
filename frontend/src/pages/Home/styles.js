import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    background: #333;
    color: #ccc;
`

const Body = styled.div`
    height: calc(100% - 43px);
    display: grid;
    grid-template-columns: 7fr 3fr;
    padding: 20px;

`

const BillsDashBoard = styled.div`
    border: 1px solid #5e5e5e;
    border-radius: 4px;
    display: flex;
    height: calc(100% - 40px);
    box-sizing: border-box;
    margin: 20px 20px 0 20px;
    overflow-y: auto;
`

const BillsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
`

const Bills = styled.div`
    background: #333;
    height: 100%;

    span {
        font-size: 13px;
    }
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
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
`

const PlusHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20%;
`

const PlusBoard = styled.div`
    height: 150px;
    flex-direction: row;
    overflow-y: auto;
`

const LessCategory = styled.div`
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
`

const LessHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20%;
`

const LessBoard = styled.div`
    height: 150px;
    flex-direction: row;
    overflow-y: auto;
`

const HeaderBar = styled.div`
    height: 43px;
    background: #ccc;
`

const NoRegistredCategory = styled.span`
    font-size: 12px;
    color: #ccc;
    box-sizing: border-box;
    margin: 10px auto;
`


export { Container, HeaderBar, Body, Bills, BillsHeader, BillsDashBoard, AdvOptions, Balance, LessCategory, LessHeader, PlusCategory, PlusHeader, PlusBoard, LessBoard, NoRegistredCategory }