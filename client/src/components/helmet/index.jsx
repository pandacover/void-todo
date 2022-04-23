import { Helmet } from 'react-helmet'

const Header = ({ title, description }) => (
    <Helmet>
        <title>Void List - {title}</title>
        <meta name='description' content={description} />
    </Helmet>
)

export default Header