import { Link, useLocation } from 'react-router';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="bg-black text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <Navbar bg="black" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-4">
            Izen
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="header-responsive-navbar" />
          <Navbar.Collapse id="header-responsive-navbar">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/inventory/stock"
                active={pathname.startsWith('/inventory')}
              >
                재고관리
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/sales/payments"
                active={pathname.startsWith('/sales')}
              >
                매출관리
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/hr/profiles"
                active={pathname.startsWith('/hr')}
              >
                인사관리
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="d-flex gap-2">
        <Button variant="outline-light" type="button">
          내프로필
        </Button>
        <Button variant="outline-light" type="button">
          로그아웃
        </Button>
      </div>
    </header>
  );
}
