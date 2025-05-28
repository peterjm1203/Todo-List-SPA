import react from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toastr from 'toastr';

import { useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';
import { FaCalendarDay } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaBan } from 'react-icons/fa';

const ModalBox = ({
  open,
  setOpen,
  data,
  setData,
  isEditing,
  setIsEditing,
  inputData,
  setInputData,
  index,
  setIndex,
}) => {
  const [titles, setTitles] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  let { title, description, deadline, priority } = inputData;

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = validateData(inputData);

    setIsValid(true);

    if (form.checkValidity() && isValid) {
      setTitles((prevTitles) => [...prevTitles, inputData.title]);
      setData((prevInfo) => [...prevInfo, { ...inputData, isComplete: false }]);
      setInputData({ title: '', description: '', deadline: '' });
      handleClose();
      toastr.success('Task Successfully Added');
    } else {
      event.stopPropagation();
    }
  }

  function handleClose() {
    setOpen(false);
    clearButtons();
    setInputData({ title: '', description: '', deadline: '' });
    setValidationErrors({});
  }

  function update(inputUpdate) {
    console.log("We've reached update()!");
    setInputData({
      ...inputData,
      [inputUpdate.target.name]: inputUpdate.target.value,
    });
    console.log(inputData);
  }

  function handleUpdate() {
    console.log(inputData);
    const newData = [...data];
    newData.splice(index, 1, inputData);
    console.log(newData);
    setData(newData);
    setIsEditing(false);
    toastr.success('Task successfully updated!');
    handleClose();
  }

  function clearButtons() {
    document.getElementById('lowButton').checked = false;
    document.getElementById('medButton').checked = false;
    document.getElementById('highButton').checked = false;
    setIsValid(false);
  }

  function validateData(input) {
    let hasError = !(
      input.title === '' ||
      !input.title ||
      input.description === '' ||
      !input.description ||
      input.deadline === '' ||
      !input.deadline ||
      (!isEditing && titles.includes(data.title)) ||
      input.priority === '' ||
      !input.priority
    );
    return hasError;
  }

  return (
    <Modal show={open}>
      <Modal.Dialog>
        <Modal.Header style={{ backgroundColor: '#0275d8' }}>
          {!isEditing ? (
            <Modal.Title style={{ color: 'white' }}>
              <h5>
                <FaPlusCircle /> Add Task
              </h5>
            </Modal.Title>
          ) : (
            <Modal.Title style={{ color: 'white' }}>
              <h5>
                <FaEdit /> Edit Task
              </h5>
            </Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} validated={isValid}>
            {/** Title Box */}
            <Form.Group className="mb-3">
              {!isEditing && (
                <Form.Control
                  name="title"
                  type="text"
                  id="inputTitle"
                  placeholder="Title"
                  autoFocus
                  onChange={update}
                  value={inputData.title}
                  required
                ></Form.Control>
              )}
              {validationErrors.duplicateTitle && (
                <Form.Control.Feedback
                  style={{ display: 'block' }}
                  type="invalid"
                >
                  {validationErrors.duplicateTitle}
                </Form.Control.Feedback>
              )}
              <Form.Control.Feedback type="invalid">
                Title is required!
              </Form.Control.Feedback>
            </Form.Group>
            {/** Description Box */}
            <Form.Group className="mb-3">
              {!isEditing ? (
                <Form.Control
                  name="description"
                  type="text"
                  id="descriptionInput"
                  placeholder="Description"
                  value={inputData.description}
                  onChange={update}
                  required
                ></Form.Control>
              ) : (
                <label for="descriptionInput" className="has-float-label">
                  <span>Description</span>
                  <Form.Control
                    name="description"
                    type="text"
                    id="descriptionInput"
                    placeholder="Description"
                    value={inputData.description}
                    onChange={update}
                    required
                  ></Form.Control>
                </label>
              )}
              <Form.Control.Feedback type="invalid">
                Description is required!
              </Form.Control.Feedback>
            </Form.Group>
            {/** Deadline Box */}
            <Form.Group className="mb-3">
              <label for="deadlineInput" className="has-float-label">
                <Form.Control
                  name="deadline"
                  type="date"
                  id="deadlineInput"
                  value={inputData.deadline}
                  onChange={update}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Deadline is required!
                </Form.Control.Feedback>
                <span>Deadline</span>
              </label>
            </Form.Group>
            {/** Radio */}
            <Form.Group>
              <div key={'default-radio'} className="mb-2">
                <Form.Check
                  inline
                  type="radio"
                  id="lowButton"
                  label="Low"
                  value="Low"
                  name="priority"
                  onChange={update}
                  required
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="medButton"
                  label="Med"
                  value="Med"
                  name="priority"
                  onChange={update}
                  required
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="highButton"
                  label="High"
                  value="High"
                  name="priority"
                  onChange={update}
                  required
                ></Form.Check>
              </div>
              {validationErrors.priority && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: 'block' }}
                >
                  {validationErrors.priority}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={!isEditing ? handleSubmit : handleUpdate}
          >
            {!isEditing ? (
              <div>
                <FaPlusCircle /> ADD
              </div>
            ) : (
              <div>
                <FaEdit /> EDIT
              </div>
            )}
          </Button>
          <Button variant="danger" onClick={handleClose}>
            <FaBan /> CANCEL
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ModalBox;
