import React from 'react';
import MaterialTable from 'material-table';
import Footer from "./Footer";
export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Stats', field: 'Stats', type: 'numeric' },
      
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', Stats: 1987,},
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        Stats: 2017,
      },
    ],
  });

  return (
    <section id="wrapper" className="Main">
                <div id="wrapper-contents" >
                <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
    <MaterialTable
    
      title="Your Team"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      
    />
    </div>
                <Footer/>
            </section>
  );
  
}
