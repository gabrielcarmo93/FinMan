import styled from 'styled-components'

export const Container = styled.div`
    background-color: #333;
    flex: 1;
    height: 100%;
`

export const HeaderBar = styled.div`
    height: 90px;
    background: #f6f6f6;
    display: flex;
    justify-content: space-between
    padding: 0 20px;
    
    img {
        height: 100%;
    }
    div {
        display: flex;
        align-items: center
        flex-direction: column;
        padding: 4px 0;
        
        span {
            letter-spacing: 4px
        }

        div#inputGroup {
            display: flex;
            flex-direction: row;
    
            input {
                border: 1px solid #aaa !important
                margin: 0px 4px;
            }

            input::placeholder {
                color: #aaa !important
            }
        }
    }
`

export const Body = styled.div`
    height: calc(100% - 90px);
    display: grid;
    grid-template-columns: 4fr 2fr;

    div#landing {
        padding: 4em;
        height: 100%;
        width: 100%;
        overflow-y: auto;
        h1 {
            color: #bebebe;
            font-weight: 400;
            text-align: center;
        }

        p {
            text-indent:4em
            color: #bebebe;
            font-weight: 400;
            font-size: 18px;
            letter-spacing: 1px;
        }

        img {
            width: 43.4%;
        }
    }

    div#register {
        padding: 30px 40px;
        color: #bebebe;

        span {
            margin: 0 auto !important;
        }

        form#registerFormWrapper {
            flex: 1;

            input::placeholder {
                color: #999;
            }

            div {
                margin: 4px 0;
            }

            div#doubleInput {
                display: grid;
                grid-template-columns: 1fr 1fr
                justify-content: space-between

                input {
                    box-sizing: border-box;
                }

                input#firstname {
                    margin-right: 2px;
                }

                input#lastname {
                    margin-left: 2px;
                }

                input#firstpassword {
                    margin-right: 2px;
                }

                input#repeatpassword {
                    margin-left: 2px;
                }
            }
            
            
        }
    }

`