// import React, { useState, useEffect } from "react";
// import {
//   Layout,
//   Menu,
//   Avatar,
//   Typography,
//   Card,
//   Row,
//   Col,
//   List,
//   Tag,
//   Text,
// } from "antd";

// // Import mock data
// import userData from "../../Data/userData";
// import cartData from "../../Data/cartData";
// import orderData from "../../Data/orderData";

// const { Content, Sider } = Layout;
// const { Title } = Typography;

// const Dashboard = () => {
//   const [user, setUser] = useState(userData);
//   const [cart, setCart] = useState(cartData);
//   const [orders, setOrders] = useState(orderData);

//   useEffect(() => {
//     // For future expansion, we could fetch or manipulate data here.
//     // For now, using mock data directly
//   }, []);

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider breakpoint="lg" collapsedWidth="0">
//         <div style={{ color: "#fff", padding: "16px" }}>
//           <Title level={4} style={{ color: "#fff" }}>
//             Dashboard
//           </Title>
//         </div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//           <Menu.Item key="1">Overview</Menu.Item>
//           <Menu.Item key="2">Orders</Menu.Item>
//           <Menu.Item key="3">Settings</Menu.Item>
//         </Menu>
//       </Sider>

//       <Layout>
//         <Content style={{ margin: "24px 16px", padding: 24 }}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24} md={12}>
//               <Card>
//                 <Avatar size={64} src={user.avatar} />
//                 <Title level={4}>{user.name}</Title>
//                 <Text>{user.email}</Text>
//               </Card>
//             </Col>

//             <Col xs={24} md={12}>
//               <Card>
//                 <Title level={5}>Cart Summary</Title>
//                 <Text>
//                   {cart.length} items —{" "}
//                   {cart.reduce(
//                     (sum, item) => sum + item.pricePerUnit * item.quantity,
//                     0
//                   ).toFixed(2)}{" "}
//                   $
//                 </Text>
//               </Card>
//             </Col>

//             <Col span={24}>
//               <Card>
//                 <Title level={5}>Recent Orders</Title>
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={orders}
//                   renderItem={(order) => (
//                     <List.Item>
//                       <List.Item.Meta
//                         title={`Order #${order.id}`}
//                         description={`Date: ${order.date}`}
//                       />
//                       <div>
//                         <Tag
//                           color={order.status === "Delivered" ? "green" : "orange"}
//                         >
//                           {order.status}
//                         </Tag>
//                         <Text style={{ marginLeft: 10 }} strong>
//                           ${order.total.toFixed(2)}
//                         </Text>
//                       </div>
//                     </List.Item>
//                   )}
//                 />
//               </Card>
//             </Col>
//           </Row>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from "react";
// import {
//   Layout,
//   Menu,
//   Avatar,
//   Typography,
//   Card,
//   Row,
//   Col,
//   List,
//   Tag,
//   Text,
// } from "antd";

// // Import mock data
// import userData from "../../Data/userData";
// import cartData from "../../Data/cartData";
// import orderData from "../../Data/orderData";

// const { Content, Sider } = Layout;
// const { Title } = Typography;

// const Dashboard = () => {
//   const [user, setUser] = useState(userData);
//   const [cart, setCart] = useState(cartData);
//   const [orders, setOrders] = useState(orderData);

//   useEffect(() => {
//     // For future expansion, we could fetch or manipulate data here.
//     // For now, using mock data directly
//   }, []);

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider breakpoint="lg" collapsedWidth="0">
//         <div style={{ color: "#fff", padding: "16px" }}>
//           <Title level={4} style={{ color: "#fff" }}>
//             Dashboard
//           </Title>
//         </div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//           <Menu.Item key="1">Overview</Menu.Item>
//           <Menu.Item key="2">Orders</Menu.Item>
//           <Menu.Item key="3">Settings</Menu.Item>
//         </Menu>
//       </Sider>

//       <Layout>
//         <Content style={{ margin: "24px 16px", padding: 24 }}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24} md={12}>
//               <Card>
//                 <Avatar size={64} src={user.avatar} />
//                 <Title level={4}>{user.name}</Title>
//                 <Text>{user.email}</Text>
//               </Card>
//             </Col>

//             <Col xs={24} md={12}>
//               <Card>
//                 <Title level={5}>Cart Summary</Title>
//                 <Text>
//                   {cart.length} items —{" "}
//                   {cart.reduce(
//                     (sum, item) => sum + item.pricePerUnit * item.quantity,
//                     0
//                   ).toFixed(2)}{" "}
//                   $
//                 </Text>
//               </Card>
//             </Col>

//             <Col span={24}>
//               <Card>
//                 <Title level={5}>Recent Orders</Title>
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={orders}
//                   renderItem={(order) => (
//                     <List.Item>
//                       <List.Item.Meta
//                         title={`Order #${order.id}`}
//                         description={`Date: ${order.date}`}
//                       />
//                       <div>
//                         <Tag
//                           color={order.status === "Delivered" ? "green" : "orange"}
//                         >
//                           {order.status}
//                         </Tag>
//                         <Text style={{ marginLeft: 10 }} strong>
//                           ${order.total.toFixed(2)}
//                         </Text>
//                       </div>
//                     </List.Item>
//                   )}
//                 />
//               </Card>
//             </Col>
//           </Row>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;
