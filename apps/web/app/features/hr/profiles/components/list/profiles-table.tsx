import { Container, Row, Col, Table } from 'react-bootstrap';

import type {
  ProfileListResponseDto,
  ProfileListRequestDto,
} from '~/features/hr/profiles/schemas';
import { SortChevron } from '~/shared/components/ui/chevron';
import { CustomPagination } from '~/shared/components/layout/pagination';

interface Props {
  data: ProfileListResponseDto;
  params: ProfileListRequestDto;
}

export default function ProfilesTable({ data, params }: Props) {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Table bordered hover>
            <thead className="table-dark">
              <tr>
                <th className="text-center" style={{ width: '10%' }}>
                  사번
                  <SortChevron
                    sortOrderParam={params.sortOrder}
                    sortPathParam={params.sortPath}
                    sortPath="EMPLOYEE"
                  />
                </th>
                <th className="text-center" style={{ width: '11%' }}>
                  이름
                </th>
                <th className="text-center" style={{ width: '15%' }}>
                  연락처
                </th>
                <th className="text-center" style={{ width: '15%' }}>
                  부서
                  <SortChevron
                    sortOrderParam={params.sortOrder}
                    sortPathParam={params.sortPath}
                    sortPath="DEPARTMENT"
                  />
                </th>
                <th className="text-center" style={{ width: '10%' }}>
                  직급
                  <SortChevron
                    sortOrderParam={params.sortOrder}
                    sortPathParam={params.sortPath}
                    sortPath="POSITION"
                  />
                </th>
                <th className="text-center" style={{ width: '15%' }}>
                  등록일
                </th>
                <th className="text-center" style={{ width: '15%' }}>
                  수정일
                </th>
              </tr>
            </thead>
            <tbody>
              {data.employeeProfiles.contents.map((profile) => (
                <tr style={{ cursor: 'pointer' }}>
                  <td>{profile.employeeCode}</td>
                  <td>{profile.employeeName}</td>
                  <td>{profile.phone}</td>
                  <td>{profile.departmentName}</td>
                  <td>{profile.positionName}</td>
                  <td>{profile.createdAt.toLocaleDateString()}</td>
                  <td>{profile.updatedAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          <CustomPagination data={data.employeeProfiles} />
        </Col>
      </Row>
    </Container>
  );
}
