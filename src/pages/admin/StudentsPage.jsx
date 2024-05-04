import { Fragment, useEffect, useState } from "react";
import { Button, Checkbox, Flex, Form, Image, Input, Modal, Table } from "antd";
import { useParams } from "react-router-dom";
import request from "../../server/request";
import { useForm } from "antd/es/form/Form";

const StudentsPage = () => {
  const { teacherId } = useParams();
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null)

  const [form] = useForm()

  useEffect(() => {
    const getData = async () => {
     try {
      refresh
      setLoading(true);
      const { data } = await request(`Teachers/${teacherId}/Students`);
      setStudents(data);
    } catch (error) {
      console.log(error);
      
     }finally{
       setLoading(false);
     }
    };
    getData();
  }, [teacherId, refresh]);

  const refreshFetch = () =>{
    setRefresh(!refresh)
  }

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = async() => {
    try {
      const value = await form.validateFields()
      if(selected === null ){
        await request.post(`Teachers/${teacherId}/Students`, value)
      }else{
        await request.put(`Teachers/${teacherId}/Students/${selected}`, value)
      }
      setIsModalOpen(false);
      refreshFetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editStudent = async(id) =>{
    const {data} = await request(`Teachers/${teacherId}/Students/${id}`)
    form.setFieldsValue(data)
    setIsModalOpen(true);
    setSelected(id)
  }

  const deleteStudent = async(id) =>{
    const checkStudentDelete = window.confirm()
    if(checkStudentDelete){
       await request.delete(`Teachers/${teacherId}/Students/${id}`)
      refreshFetch()
    }
  }

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Image src={avatar} alt="avatar" width="50px" height="50px" />
      ),
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "name",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Iswork",
      dataIndex: "isWork",
      key: "isWork",
      render: (isWork) => (isWork ? "Yes" : "No"),
    },
    {
      title: "Action",
      dataIndex: 'id',
      render: (id) => (
        <Fragment>
          <Button onClick={()=> editStudent(id)} type="primary" style={{ marginRight: "10px" }}>
            Edit
          </Button>
          <Button onClick={() => deleteStudent(id)} danger>Delete</Button>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        title={() => (
          <Flex align="center" justify="space-between">
            <h1>Students: {students?.length}</h1>
            <Button
              onClick={showModal}
              type="primary"
              style={{ marginLeft: "10px" }}
            >
              Add Student
            </Button>
          </Flex>
        )}
        pagination={false}
        dataSource={students}
        columns={columns}
        loading={loading}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
        form={form}
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="FirtsName"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="LastName"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isWork"
            valuePropName="checked"
          >
            <Checkbox>Iswork</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default StudentsPage;
