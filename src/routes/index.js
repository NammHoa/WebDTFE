import AdminPage from "../pages/AdminPage/AdminPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProduct";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignUpPage from "../pages/SignUpPgae/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {path: '/order',
        page: OrderPage,
        isShowHeader: true

    },
    {path: '/products',
        page: ProductPage,
        isShowHeader: true
    },
    {path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {path: '/login',
        page: LoginPage,
        isShowHeader: false
    },
    {path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {path: '/detail-product/:id',
        page: DetailProductPage,
        isShowHeader: true},
    {path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {path: '*',
        page: NotFoundPage
    }
]