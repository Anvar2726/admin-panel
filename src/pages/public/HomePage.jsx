import { Col, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import request from "../../server/request";
import TeachersCard from "../../components/card/teachers";
import StudentsCard from "../../components/card/students";



const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    const getData = async() =>{
      try {
        setLoading(true)
      const {data} = await request('/Teachers')
      setTeachers(data)
      const {data: studentsdata} = await request('/Students');
      setStudents(studentsdata)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    getData()
  },[])

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Teachers',
      children: <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{teachers.map(el =><Col key={el.id} span={6}> <TeachersCard  {...el} loading={loading}/></Col>)}</Row>,
    },
    {
      key: '2',
      label: 'Students',
      children: <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{students.map(el =><Col key={el.id} span={6}> <StudentsCard {...el} loading={loading}/></Col>)}</Row>,
    },]

  return (
  <Tabs size={"large"} defaultActiveKey="1" items={items} onChange={onChange} />
  )
}

export default HomePage
