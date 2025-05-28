import react from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';

import { FaEdit } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

const Table = ({
  inputData,
  setInputData,
  open,
  setOpen,
  setIndex,
  isComplete,
  setIsComplete,
  isEditing,
  setIsEditing,
  data,
  setData,
}) => {
  function handleUpdate(index) {
    let { title, description, deadline, priority } = data[index];
    setInputData(data[index]);
    setIndex(index);
    setIsEditing(true);
    setOpen(true);
  }

  function handleChangeToIsComplete(index) {
    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });
    setData(newData); // believe this wont run!!
  }

  function openModalBox() {
    setOpen(true);
  }

  function handleDelete(index) {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    toastr.success('Task deleted successfully!');
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Priority</th>
            <th scope="col">Is Complete</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.deadline}</td>
                <td>{item.priority}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="isComplete"
                    id={'isComplete - ${index}'}
                    checked={item.isComplete}
                    onChange={() => {
                      handleChangeToIsComplete(index);
                    }}
                  ></Form.Check>
                </td>
                <td>
                  <div className="d-grid">
                    {!item.isComplete && (
                      <div className="col">
                        <Button
                          size="sm"
                          onClick={() => handleUpdate(index)}
                          variant="primary"
                        >
                          <FaEdit /> UPDATE
                        </Button>
                      </div>
                    )}
                    <div className="col">
                      <Button
                        size="sm"
                        onClick={() => handleDelete(index)}
                        variant="danger"
                      >
                        <FaRegTimesCircle /> DELETE
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
