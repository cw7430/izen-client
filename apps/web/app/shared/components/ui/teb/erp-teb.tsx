import { Link, useLocation } from 'react-router';
import { Col, Container, Row, Nav } from 'react-bootstrap';

interface Props {
  children?: React.ReactNode;
  domain: 'hr' | 'inventory' | 'sales';
}

export default function ErpTeb({ children, domain }: Props) {
  const { pathname } = useLocation();

  const categories = {
    hr: [
      { idx: 1, title: '직원관리', path: '/hr/profiles' },
      { idx: 2, title: '근태관리', path: '/hr/attendance' },
      { idx: 3, title: '급여관리', path: '/hr/payroll' },
    ],
    inventory: [
      { idx: 1, title: '재고관리', path: '/inventory/stock' },
      { idx: 2, title: '생산관리', path: '/inventory/products' },
      { idx: 3, title: '입출고관리', path: '/inventory/movements' },
    ],
    sales: [
      { idx: 1, title: '매출관리', path: '/sales/payments' },
      { idx: 2, title: '결제관리', path: '/sales/records' },
    ],
  } as const;

  const currentCategories = [...categories[domain]].sort(
    (a, b) => a.idx - b.idx,
  );

  return (
    <Container>
      <Row className="justify-content-between">
        <Col xs={9} className="d-flex">
          <Nav className="w-100" fill variant="tabs" data-bs-theme="dark">
            {currentCategories.map(({ idx, title, path }) => (
              <Nav.Item key={idx}>
                <Nav.Link as={Link} to={path} active={pathname === path}>
                  {title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col xs={2} className="text-end">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
