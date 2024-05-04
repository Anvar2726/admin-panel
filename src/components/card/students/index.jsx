import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import PropTypes from 'prop-types'

const StudentsCard = ({loading, avatar, firstName, lastName, isWork}) => {
  return (
    <Card
      style={{
        width: 300,
        marginTop: 16,
      }}
      loading={loading}
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={`${firstName} ${lastName}`}
        description= {`Work? ${isWork ? 'yes' : 'no'}`}
      />
    </Card>
  )
}
StudentsCard.propTypes = {
    loading: PropTypes.bool,
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isWork: PropTypes.bool
}

export default StudentsCard