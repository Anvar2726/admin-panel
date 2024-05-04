import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";

const {useForm} = Form

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import request from "../../server/request";
import { Link } from "react-router-dom";



const TeachersPage = () => {
  const [teachers, setTeachers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [selected, setSelected] = useState(null);

  const [form] = useForm()

  useEffect(() => {
    const getData = async () => {
      const params = { page, limit,};
      try {
        refresh
        setLoading(true);
        const { data } = await request("Teachers", { params });
        setTeachers(data);
        const { data: totalData } = await request("Teachers");
        setTotal(totalData);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page, limit, refresh]);

  const refreshFetch = () =>{
    setRefresh(!refresh)
  }

  const handlePage = (page) => {
    setPage(page);
  };

  const handleChange = (value) => {
    setLimit(value.value);
    setPage(1);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields()
    setSelected(null)
  };

  const editTeacher = async(id) =>{
    const {data} = await request(`Teachers/${id}`)
    form.setFieldsValue(data)
    setSelected(id)
    setIsModalOpen(true);
  }

  const deleteTeacher = async(id) =>{
    const checkDeleteTeacher =  window.confirm()
    if(checkDeleteTeacher){
        await request.delete(`Teachers/${id}`)
        refreshFetch()
        setPage(1)
    }
  }

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => {
        return <Image src={text} width={50} />;
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Ismarried",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (text) =>
        text ? (
          <CheckCircleOutlined style={{ color: "green", fontSize: "16px" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red", fontSize: "16px" }} />
        ),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text) => `${text} $`,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id) => (
        <Fragment>
          <Button onClick={() => editTeacher(id)} type="primary" style={{ marginRight: "8px" }}>
            Edit
          </Button>
          <Button onClick={() =>deleteTeacher(id)} danger>Delete</Button>
        </Fragment>
      ),
    },
    {
        title: "View Students",
        dataIndex: "id",
        render: (id) => <Fragment><Button type="dashed"><Link to={`/admin/students/${id}`} >View</Link> </Button></Fragment>,
      },
  ];

  const handleOk = async () => {
    try {
        setBtnLoading(true)
        const val = await form.validateFields()
        if(selected === null){
            await request.post ('Teachers', val)
        }else{
            await request.put(`Teachers/${selected}`, val)
        }
        setIsModalOpen(false);
        refreshFetch()
    } catch (error) {
        console.log(error);
    }finally{
        setBtnLoading(false)
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <Fragment>
      <Table
        title={() => (<Fragment>
          <Flex align="center" justify="space-between">
            <h2>Teachers: {total?.length}</h2>{" "}
            <Button type="dashed" onClick={showModal}>
              Add Teacher
            </Button>
          </Flex>
          
          </Fragment>
        )}
        dataSource={teachers}
        columns={columns}
        loading={loading}
        pagination={false}
      />
      <Flex align="center" justify="space-between">
        <Pagination
          style={{ marginTop: "20px" }}
          onChange={handlePage}
          total={total.length}
          current={page}
          pageSize={limit}
        />
        <Select
          labelInValue
          style={{ width: 120, marginTop: "20px" }}
          defaultValue={{ value: "5", label: "5" }}
          onChange={handleChange}
          options={[
            {
              value: "5",
              label: "5",
            },
            {
              value: "10",
              label: "10",
            },
            {
              value: "15",
              label: "15",
            },
            {
                value: "20",
                label: "20",
              },
          ]}
        />
      </Flex>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={btnLoading}
      >
        <Form
        form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="LastName"
            name="lastName"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar url"
            name="avatar"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <InputNumber style={{width: "100%"}} />
          </Form.Item>

          <Form.Item
            name="isMarried"
            valuePropName="checked"
          >
            <Checkbox>IsMarried ?</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeachersPage;
