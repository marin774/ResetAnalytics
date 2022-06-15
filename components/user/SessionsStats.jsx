import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import Select, { components } from "react-select";
import Stats from '../../components/user/Stats';
const axios = require('axios');

const formatData = (_, idx) => ({label: `Session #${idx + 1}`, value: idx})

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={e => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

const MultiValue = props => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

const SessionStats = ({ data, sheet }) => {
  const [multi, setMulti] = useState(data ? data.session.filter((_, idx) => idx < 2).map(formatData) : [])
  const [sessData, setSessData] = useState(null)
  
  useEffect(() => {
    axios.post(`/api/sheet/${sheet}`, {skipSessions: multi.map(m => m.value)})
      .then(res => setSessData(res.data.overall))
  }, [])

  return (
    <>
      <Row>
        <Col md={7}>
          <h1 className="display-2">Session Stats</h1>
        </Col>
        <Col md={4}>
          <Select
            placeholder="Select sessions..."
            options={data.session.map(formatData)}
            value={multi}
            onChange={setMulti}
            defaultValue={data.session.filter(sess => sess.selected).map(formatData)}
            isMulti
            closeMenuOnSelect={false}
            controlShouldRenderValue={false}
            components={{ Option, MultiValue }}
            hideSelectedOptions={false}
            backspaceRemovesValue={false}
            styles={{
              option: styles => ({...styles, color: "black", textAlign: "left"})
            }}
          />
        </Col>
        <Col md={1}>
          <Button variant="success" onClick={() => {
            axios.post(`/api/sheet/${sheet}`, {skipSessions: multi.map(m => m.value)})
              .then(res => setSessData(res.data.overall))
          }}>
            Update
          </Button>
        </Col>
      </Row>
      { sessData && <Stats data={sessData} /> }
    </>
  )
}

export default SessionStats