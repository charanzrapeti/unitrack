// import React, { useState } from 'react';
// import { Button, Layout, Space, Typography } from 'antd';
// import SearchBar from './components/SearchBar.jsx';
// import InfoBox from './components/InfoBox.jsx';
// import CreateForm from './components/CreateForm.jsx';

// const { Content } = Layout;
// const { Title, Text } = Typography;

// const App = () => {
//   const [createFormVisible, setCreateFormVisible] = useState(false);
//   const [universityDetailsList, setUniversityDetailsList] = useState([
    
//   ]);

//   const showCreateForm = () => {
//     setCreateFormVisible(true);
//   };

//   const handleCreate = (values) => {
//     // Instead of console logging, save the result in the state
//     setUniversityDetailsList([...universityDetailsList, { universityDetails: values }]);
//     setCreateFormVisible(false);
//   };

//   const handleCancel = () => {
//     setCreateFormVisible(false);
//   };

//   const handleEdit = (item) => {
//     // Open CreateForm with selected item details
//     setCreateFormVisible(true);
//     setEditItem(item);
//   };

//   const handleDelete = (item) => {
//     // Update universityDetailsList after delete confirmation
//     const updatedList = universityDetailsList.filter((i) => i !== item);
//     setUniversityDetailsList(updatedList);
//   };

//   return (
//     <Layout>
//       <div style={{ textAlign: 'center', padding: '1rem', backgroundColor:'#001529' }}>
//         <Title style={{ color: '#FFFFFF',  marginBottom:'0px'}}>UniTrack</Title>
//         <Text style={{ color: '#FFFFF7' }}>Track your University Applications effectively</Text>
//       </div>
//       <Content style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Space direction="vertical" style={{ width: '100%' }}>
//           <SearchBar />
//           <InfoBox 
//           universityDetailsList={universityDetailsList}
//           onUpdate={handleEdit}
//           onDelete={handleDelete} />
//           <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
//             <Button type="primary" onClick={showCreateForm}>
//               Create
//             </Button>
//           </div>
//         </Space>
//         <CreateForm visible={createFormVisible} onCancel={handleCancel} onCreate={handleCreate} />
//       </Content>
//     </Layout>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { Button, Layout, Space, Typography } from 'antd';
import SearchBar from './components/SearchBar.jsx';
import InfoBox from './components/InfoBox.jsx';
import CreateForm from './components/CreateForm.jsx';
import EditForm from './components/EditForm.jsx'; // Import the EditForm component

const { Content } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [universityDetailsList, setUniversityDetailsList] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editItem, setEditItem] = useState(null); // Define setEditItem function

  const showCreateForm = () => {
    setCreateFormVisible(true);
  };

  const handleCreate = (values) => {
    // Instead of console logging, save the result in the state
    setUniversityDetailsList([...universityDetailsList, { universityDetails: values }]);
    setCreateFormVisible(false);
  };

  const handleEdit = (item) => {
    // Set the item being edited and show the edit form
    setEditItem(item);
    setEditFormVisible(true);
  };

  const handleEditFormCancel = () => {
    // Reset the edit item and hide the edit form
    setEditItem(null);
    setEditFormVisible(false);
  };

  const handleEditFormUpdate = (updatedValues) => {
    // Update the universityDetailsList with the edited item
    const updatedList = universityDetailsList.map((item) =>
      item === editItem ? { universityDetails: updatedValues } : item
    );

   

    // Update the state with the modified list
    setUniversityDetailsList(updatedList);
  };

  const handleDelete = (item) => {
    const updatedList = universityDetailsList.filter((i) => i !== item);
    setUniversityDetailsList(updatedList);
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor:'#001529' }}>
        <Title style={{ color: '#FFFFFF',  marginBottom:'0px'}}>UniTrack</Title>
        <Text style={{ color: '#FFFFF7' }}>Track your University Applications effectively</Text>
      </div>
      <Content style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <SearchBar />
          <InfoBox
            universityDetailsList={universityDetailsList}
            onUpdate={handleEdit} // Pass handleEdit function to InfoBox
            onDelete={handleDelete} // Pass handleDelete function to InfoBox
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button type="primary" onClick={showCreateForm}>
              Create
            </Button>
          </div>
        </Space>
        <CreateForm visible={createFormVisible} onCancel={() => setCreateFormVisible(false)} onCreate={handleCreate} />
        {/* Pass necessary props to EditForm */}
        <EditForm visible={editFormVisible} onCancel={handleEditFormCancel} onUpdate={handleEdit} item={editItem} />
      </Content>
    </Layout>
  );
};

export default App;

