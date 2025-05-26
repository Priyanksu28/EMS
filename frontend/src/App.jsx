import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import AssetList from './components/assets/AssetList'
import AddAsset from './components/assets/AddAsset'
import EditAsset from './components/assets/EditAsset'
import ViewAsset from './components/assets/ViewAsset'
import List from './components/employee/List'
import Add from './components/employee/Add'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import EditDepartment from './components/departments/EditDepartment'
import View from './components/employee/View'
import Edit from './components/employee/Edit'
import AddAssign from './components/assign/Add'
import ViewAssign from './components/assign/View'
import AuthContext from './context/authContext'
import Summary from './components/EmployeeDashboard/Summary'
import IssueList from './components/issue/List'
import AddIssue from './components/issue/Add'
import Setting from './components/EmployeeDashboard/Setting'
import Table from './components/issue/Table'
import Detail from './components/issue/Detail'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
// import EmpAsset from './components/employee/EmpAsset'


function App() {
  

  return (
    <AuthContext>
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/admin-dashboard' element={
          
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
          
          }>

          <Route index element={<AdminSummary />}></Route>

          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/departments/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>


          <Route path='/admin-dashboard/assets' element={<AssetList />}></Route>
          <Route path='/admin-dashboard/assets/add-asset' element={<AddAsset />}></Route>
          <Route path='/admin-dashboard/assets/:id' element={<ViewAsset />}></Route>
          <Route path='/admin-dashboard/asset/:id' element={<EditAsset />}></Route>
          
          
          <Route path='/admin-dashboard/employees' element={<List />}></Route>
          <Route path='/admin-dashboard/employees/add-employee' element={<Add />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />}></Route>
          <Route path='/admin-dashboard/employees/assign/:id' element={<ViewAssign />}></Route>


          <Route path='/admin-dashboard/assign/add' element={<AddAssign />}></Route>


          <Route path='/admin-dashboard/issues' element={<Table />}></Route>
          <Route path='/admin-dashboard/issues/:id' element={<Detail />}></Route>
          <Route path='/admin-dashboard/employees/issues/:id' element={<IssueList />}></Route>


          <Route path='/admin-dashboard/setting' element={<Setting />}></Route>

          </Route>


        <Route path='/employee-dashboard' element={
          
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>

          }>


          <Route index element={<Summary />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>


          <Route path='/employee-dashboard/issues/:id' element={<IssueList />}></Route>
          <Route path='/employee-dashboard/issues/add-issue' element={<AddIssue />}></Route>
          
          <Route path='/employee-dashboard/assign/:id' element={<ViewAssign />}></Route>
          {/* <Route path='/employee-dashboard/assign/assets/:id' element={<EmpAsset />}></Route> */}
          
          <Route path='/employee-dashboard/setting' element={<Setting />}></Route>


        </Route>
      </Routes>
    </BrowserRouter>
    </AuthContext>
  )
}

export default App
