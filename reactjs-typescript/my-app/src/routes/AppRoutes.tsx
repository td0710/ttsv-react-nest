import { GiayXacNhanSinhVienPage } from "../pages/GiayXacNhanSinhVienPage";
import { Loading } from "../pages/Loading";
import { ThongTinCaNhanPage } from "../pages/ThongTinCaNhanPage";
import MainLayout from "../pages/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";

import { PublicRoute } from "./PublicRoute";
import { ThongBaoPage } from "../pages/ThongBaoPage";
import { DangKyKTXPage } from "../pages/KTX/DangKyKTXPage";
import { DangKyXeBuytPage } from "../pages/DangKyXeBuytPage";
const withLayout = (component: React.ReactNode) => (
  <MainLayout>{component}</MainLayout>
);

const protect = (component: React.ReactNode) => (
  <ProtectedRoute>{component}</ProtectedRoute>
);

const AppRoutes = [
  {
    path: "/auth-callback",
    element: <Loading />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        (<LoginPage />)
      </PublicRoute>
    ),
  },

  {
    index: true,
    element: protect(withLayout(<ThongTinCaNhanPage />)),
  },
  {
    path: "/",
    element: protect(withLayout(<ThongTinCaNhanPage />)),
  },
  {
    path: "/thongtincanhan",
    element: protect(withLayout(<ThongTinCaNhanPage />)),
  },
  {
    path: "/dangkyvexebuyt",
    element: protect(withLayout(<DangKyXeBuytPage />)),
  },
  {
    path: "/giayxacnhansinhvien",
    element: protect(withLayout(<GiayXacNhanSinhVienPage />)),
  },
  {
    path: "/thongbao",
    element: protect(withLayout(<ThongBaoPage></ThongBaoPage>)),
  },
  {
    path: "/dangkyktx",
    element: protect(withLayout(<DangKyKTXPage />)),
  },
];

export default AppRoutes;
