import { Avatar, Card } from "antd"
import Meta from "antd/es/card/Meta"
import PropTypes from 'prop-types'


const TeachersCard = ({loading, avatar, firstName, lastName, salary}) => {
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
        description={`Salary: ${salary} $`}
      />
    </Card>
  )
}

TeachersCard.propTypes = {
  loading: PropTypes.bool,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  salary: PropTypes.number,
}

export default TeachersCard