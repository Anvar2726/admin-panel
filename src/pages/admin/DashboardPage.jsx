import { Col, Flex, Progress, Row, Statistic } from "antd";
import { Fragment, useEffect, useState } from "react";
import request from "../../server/request";

const DashboardPage = () => {
  const [teachers, setTeachers] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await request("/Teachers");
      setTeachers(data);
      const { data: studentsData } = await request("/Students");
      setStudents(studentsData);
    };
    getData();
  }, []);

  const marriedTeachers = teachers?.filter((el) => el.isMarried === true);
  const unMarriedTeachers = teachers?.filter((el) => el.isMarried === false);

  const workingStudents = students?.filter((el) => el.isWork === true);
  const unWorkingStudents = students?.filter((el) => el.isWork === false);

  return (
    <Fragment>
      <Row gutter={24}>
      <Col span={12}>
        <Statistic title="Teachers quantity" value={teachers?.length} />
      </Col>
      <Col span={12}>
        <Statistic title="Students quantity" value={students?.length} />
      </Col>
      <Flex justify="space-between" gap='300px' >
        <Flex align="center" vertical="column" gap="small">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Married teachers</h1>
            <Progress
              type="dashboard"
              steps={10}
              percent={Math.round(
                (marriedTeachers?.length * 100) / teachers?.length
              )}
              trailColor="rgb(255, 64, 125, 0.6)"
              strokeWidth={20}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Unmarried teachers</h1>
            <Progress
              type="dashboard"
              steps={10}
              percent={Math.round(
                (unMarriedTeachers?.length * 100) / teachers?.length
              )}
              trailColor="rgb(255, 64, 125, 0.6)"
              strokeWidth={20}
            />
          </div>
        </Flex>
        <Flex align="center" vertical="column" gap="small">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Working Students</h1>
            <Progress
              type="dashboard"
              steps={10}
              percent={Math.round(
                (workingStudents?.length * 100) / students?.length
              )}
              trailColor="rgb(255, 64, 125, 0.6)"
              strokeWidth={20}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>Unworking Students</h1>
            <Progress
              type="dashboard"
              steps={10}
              percent={Math.round(
                (unWorkingStudents?.length * 100) / students?.length
              )}
              trailColor="rgb(255, 64, 125, 0.6)"
              strokeWidth={20}
            />
          </div>
        </Flex>
      </Flex>
    </Row>
    </Fragment>
  );
};

export default DashboardPage;
