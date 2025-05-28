import { FC } from 'react';
import toastr from 'toastr';

import './style.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import ModalBox from './components/ModalBox';

import { useState } from 'react';

toastr.options = {
  positionClass: 'toast-bottom-right',
};

export const App: FC<{ name: string }> = ({ name }) => {
  const [inputData, setInputData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 0,
  });

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div>
      <Navbar setOpen={setOpen} />
      <Table
        open={open}
        setOpen={setOpen}
        inputData={inputData}
        setInputData={setInputData}
        data={data}
        setData={setData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIndex={setIndex}
      />
      <ModalBox
        open={open}
        setOpen={setOpen}
        inputData={inputData}
        setInputData={setInputData}
        data={data}
        setData={setData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        index={index}
        setIndex={setIndex}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
      />
    </div>
  );
};
