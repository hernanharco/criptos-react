import styled from "@emotion/styled"

const Resultcss = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Image = styled.img`
    display: block;
    width: 120px;
`

const Text = styled.div`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Price = styled.div`
    font-size: 24px;
    span {
        font-weight: 700;
    }
    
`

const Result = ({ result }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = result;
    return (
        <Resultcss>
            <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" 
            />
            <div>
                <Price>El precio es de: <span>{PRICE}</span></Price>
                <Text>El precio más alto del día: <span>{HIGHDAY}</span></Text>
                <Text>El precio más bajo del día: <span>{LOWDAY}</span></Text>
                <Text>Variación útimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Text>
                <Text>Última Actualización: <span>{LASTUPDATE}</span></Text>
            </div>
        </Resultcss>
    )
}

export default Result