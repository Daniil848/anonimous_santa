import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupDateError, saveGroupDate, createGroupDate } from "../../store/actions/actions";

const GroupDate = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.adminReducer);
  const [budgetInput, setBudget] = useState(state.date.budget);
  const [registrationInput, setRegistration] = useState(state.date.registration);
  const [choosingInput, setChoosing] = useState(state.date.choosing);
  const [exchangeInput, setExchange] = useState(state.date.exchange);
  const update = (state.group.id !== null);
  let groupDB = {
    group : {
      name : state.group.name,
    },
    date : {
      budget : budgetInput,
      registration : registrationInput,
      choosing : choosingInput,
      exchange : choosingInput,
    },
    admin : {
      name : state.admin.name,
      email : state.admin.email,
    },
    gift : {
      age : state.gift.age,
      gender : state.gift.gender,
      wishes : state.gift.wishes,
    }
  };
  const addDate = () => {
    if (budgetInput === "" || registrationInput === "" || choosingInput === "" || exchangeInput === "") {
      dispatch(groupDateError(true));
      return;
    };
    if (update) {
      dispatch(saveGroupDate({
        groupDB,
        groupID : state.group.id,
      }));
    } else {
      dispatch(createGroupDate({
        date : {
          budget : budgetInput,
          registration : registrationInput,
          choosing : choosingInput,
          exchange : exchangeInput,
        },
      }));
    }
  };

  if (state.date.edit) {
    return (
      <>
        <div className="group_label">Регистрация участников до:</div>
        <div className="group_form_container">
          <label htmlFor="budget">Бюджет:</label>
          <input
            id="budget"
            type="text"
            className="group_input"
            value={budgetInput}
            onChange={e => setBudget(e.target.value)}
            placeholder=""
          ></input>
          {state.date.error === true && (<div className="error_text">Бюджет не может быть пустым!</div>)}
        
          <label htmlFor="date1">Регистрация участников до:</label>
          <input
            id="date1"
            type="date"
            className="group_input"
            value={registrationInput}
            onChange={e => setRegistration(e.target.value)}
          ></input>
          {state.date.error === true && (<div className="error_text">Дата не может быть не назначена!</div>)}
        
          <label htmlFor="date2">Выбор получателей подарков до:</label>
          <input
            id="date2"
            type="date"
            className="group_input"
            value={choosingInput}
            onChange={e => setChoosing(e.target.value)}
          ></input>
          {state.date.error === true && (<div className="error_text">Дата не может быть не назначена!</div>)}
        
          <label htmlFor="date3">Обмен подарками:</label>
          <input
            id="date3"
            type="date"
            className="group_input"
            value={exchangeInput}
            onChange={e => setExchange(e.target.value)}
          ></input>
          {state.date.error === true && (<div className="error_text">Дата не может быть не назначена!</div>)}
        </div>
        
        <button
          className="group_button"
          onClick={addDate}
        >ОК</button>
      </>
    );
  };
};

export default GroupDate;