import React, { useEffect, useState } from 'react'
import './dashboard.scss'
import Calendar from 'react-calendar';
import Select from 'react-select'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import useHttp from '../../../hooks/useHttp';


const Dashboard = () => {

  const { loading: categoryFetch, error: categoryError, data: categoryData, sendRequest: categorysendRequest }: { loading: boolean, error: string, data: any, sendRequest: any } = useHttp();
  const { loading: expenseloading, error: expenseError, data: expenseData, sendRequest: expensesendRequest }: { loading: boolean, error: string, data: any, sendRequest: any } = useHttp();
  const { loading: addexpenseloading, error: addexpenseError, data: addexpenseData, sendRequest: addexpensesendRequest }: { loading: boolean, error: string, data: any, sendRequest: any } = useHttp();
  const { loading: dashboardLoading, error: dashboardError, data: dashboardData, sendRequest: dashboardsendRequest }: { loading: boolean, error: string, data: any, sendRequest: any } = useHttp();



  const [openNewTranz, setOpenNewTranz] = useState(false)

  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [isCalenderOpen, setIsCalenderOpen] = useState(false)
  const [categorySelectArray, setCategorySelectArray] = useState([])

  const [tnxType, setTnxType] = useState<string>()
  const [tnxCategory, setTnxCategory] = useState<string>()
  const [tnxDate, setTnxDate] = useState<string>()
  const [tnxDesc, setTnxDesc] = useState<string>()
  const [tnxAmount, setTnxAmount] = useState<number>()

  const DashboardFetchDetails = () => {
    let userDetail: any = localStorage.getItem('user')
    userDetail = JSON.parse(userDetail as any)
    dashboardsendRequest(`expense/dashbaordDetail?userID=${userDetail?.id}`, 'GET')
    expensesendRequest(`expense/allExpense?userID=${userDetail?.id}`, 'GET')
  }

  useEffect(() => {
    DashboardFetchDetails()
    categorysendRequest(`expense/allCategory`, 'GET')
  }, [])

  useEffect(() => {
    let item: any = []
    categoryData?.forEach((element: any) => {
      item.push({ value: element.categoryname, label: element.categoryname })
    })

    setCategorySelectArray(item)
  }, [categoryData])

  useEffect(()=>{
      setOpenNewTranz(false)
      DashboardFetchDetails()
  },[addexpenseData])

  const addNewTnx = async () => {
    console.log(tnxCategory , tnxDate , tnxType , tnxDesc);
    
    if (tnxCategory && tnxDate && tnxType && tnxDesc) {
      let userDetail: any = localStorage.getItem('user')
      userDetail = JSON.parse(userDetail as any)
      console.log(userDetail);
      
      if (userDetail.id) {

        let catData = categoryData.find((category:any) => category.categoryname === tnxCategory)
        let toSend = {
          amount: tnxAmount,
          description: tnxDesc, 
          date: moment.utc(tnxDate).format(), 
          type: tnxType, 
          user_id: userDetail.id,
          category : catData.id
        }

        console.log(toSend);

        let data = await addexpensesendRequest(`expense/addNewTnx`, 'POST' , toSend)
      }

    }
  }

  const logout = () => {
    localStorage.clear()
    window.location.replace("/")
  }
  return (
    <div className="container">
      <button onClick={logout}>Logout</button>
      <div className="higlightBlocks">
        <div className="blocks">
          <p className='blockTitle'>Current Balance</p>
          <p className='blockAmount'>Rs {dashboardData && dashboardData.currentBalance ? dashboardData.currentBalance : 0}</p>
        </div>
        <div className="blocks">
          <p className='blockTitle'>Total Income</p>
          <p className='blockAmount'>Rs {dashboardData && dashboardData.totalIncome ? dashboardData.totalIncome : 0}</p>
        </div>
        <div className="blocks">
          <p className='blockTitle'>Total Expense</p>
          <p className='blockAmount'>Rs {dashboardData && dashboardData.totalExpense ? dashboardData.totalExpense : 0}</p>
        </div>
      </div>
      <div className="addNewTransaction">
        <button className='addnew' onClick={() => { setOpenNewTranz(true) }}>Add New Transaction</button>
      </div>
      <div className="transactionsTable">
        <ul className='tableHeaders'>
          <li>Category</li>
          <li>Transaction Type</li>
          <li>Amount</li>
          <li>Description</li>
          <li>Tnx Date</li>
        </ul>
        <div className="tableBody">
          {
            expenseData?.map((expenseItem: any, index: number) => {
              return (
                <ul className='tableData'>
                  <li><p>{expenseItem?.categoryname}</p></li>
                  <li><p>{expenseItem?.type}</p></li>
                  <li><p>{expenseItem?.amount}</p></li>
                  <li><p>{expenseItem?.description}</p></li>
                  <li><p>{moment(expenseItem?.date).format("DD-MM-YYYY")}</p></li>
                </ul>
              )
            })
          }

        </div>
      </div>

      {
        openNewTranz && <>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => { setOpenNewTranz(false) }}>×</span>
              <h2>Add New Transaction</h2>
              <div className="transactionForm">
                <div className="formRow">
                  <div className="formRowItem">
                    <p>Category</p>
                    <Select className='selection' options={categorySelectArray} value={{ value: tnxCategory, label: tnxCategory }} onChange={(value) => { setTnxCategory(value?.value) }} />
                  </div>
                  <div className="formRowItem">
                    <p>Transaction Type</p>
                    <Select className='selection' options={[
                      { value: 'credit', label: 'credit' },
                      { value: 'debit', label: 'debit' },
                    ]} value={{ value: tnxType, label: tnxType }} onChange={(value) => { setTnxType(value?.value) }} />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formRowItem">
                    <p>Transaction Date</p>
                    <input type="text" value={moment(tnxDate as any).format('DD-MM-YYYY') as any} onClick={() => { setIsCalenderOpen(!isCalenderOpen) }} />
                    {
                      isCalenderOpen && <Calendar onChange={(value: any, event) => { setTnxDate(value); setIsCalenderOpen(false) }} value={tnxDate} />
                    }
                  </div>
                  <div className="formRowItem">
                    <p>Description</p>
                    <input type="text" value={tnxDesc} onChange={(event) => { setTnxDesc(event.target.value) }} />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formRowItem">
                    <p>Amount</p>
                    <input type="number" value={tnxAmount} onChange={(event) => { setTnxAmount(event.target.valueAsNumber) }} />
                  </div>                </div>
                <div className="formRow">
                  <button className='formSubmit' onClick={addNewTnx}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </>
      }


    </div>
  )
}

export default Dashboard