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
    overflow-y: auto;
  
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
    background: #fff;
    padding: 0 15px;

    img {
        height: 100%
    }
`

const NoRegistredCategory = styled.span`
    font-size: 12px;
    color: #ccc;
    box-sizing: border-box;
    margin: 10px auto;
`

const BoardItem = styled.div`
    height: 120px;
    flex: 1;

    div.in {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        height: 120px;
        background: rgba(0, 255, 0, .1);
        padding: 0 15px;
    }

    div.out {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 120px;
        background: rgba(255, 0, 0, .3);
        padding: 0 15px;
    }
`

const BillValue = styled.span`
    font-weight: 300;
    font-size: 48px !important;
`

const BillTitle = styled.span`
    font-weight: 400;
    font-size: 24px !important;
`

export { Container, HeaderBar, Body, Bills, BillsHeader, BillsDashBoard, AdvOptions, Balance, LessCategory, LessHeader, PlusCategory, PlusHeader, PlusBoard, LessBoard, NoRegistredCategory, BoardItem, BillValue, BillTitle }