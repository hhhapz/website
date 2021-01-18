import React, { FC, useEffect, useState } from "react"
import { status, token, clearToken } from "../../../utils/appeals"
import { navigate } from "gatsby"
import * as SC from "./styles"

interface Appeal {
  userID: string
  guild: string
  punishmentDate: string
  banReason: string
  appealReason: string
  additionalInfo: string
  status:
    | "processing"
    | "in_questioning"
    | "questioning_rejoined"
    | "accepted"
    | "rejected"
  rejectionExpiry?: Date
  decisionReason?: string
  created: Date
  lastUpdate: Date
}

const statusMap = {
  processing: "In Process",
  in_questioning: "In Questioning - Rejoin our Server!",
  questioning_rejoined: "In Questioning - In Progress",
  accepted: "Accepted",
  rejected: "Rejected",
}

export const Status: FC = () => {
  const [appeals, setAppeals] = useState<Array<Appeal>>([])
  const [activeAppeals, setActiveAppeals] = useState<Array<Appeal>>([])

  const load = async (token: string) => {
    status(token)
      .then((data) => {
        const appeals = data.map((a: any) => {
          return {
            userID: a.userID,
            guild: a.guild,
            punishmentDate: a.punishmentDate,
            banReason: a.banReason,
            appealReason: a.appealReason,
            additionalInfo: a.additionalInfo,
            status: a.status,
            message: a.message,
            rejectionExpiry: a.rejectionExpiry && new Date(a.rejectionExpiry),
            decisionReason: a.decisionReason,
            created: new Date(a.created),
            lastUpdate: new Date(a.lastUpdate),
          }
        })
        setAppeals(appeals)
      })
      .catch((e) => {
        alert(`Error: ${e}`)
      })
  }

  useEffect(() => {
    const tk = token()
    tk && load(tk)
    setTimeout(() => tk && load(tk), 1500)
  }, [])

  useEffect(() => {
    setActiveAppeals(
      appeals.filter((a) =>
        ["processing", "in_questioning", "questioning_rejoined"].includes(
          a.status
        )
      )
    )
  }, [appeals, setActiveAppeals])

  return (
    <React.Fragment>
      <h3>Stats</h3>
      <ul>
        <li>Total Appeals: {appeals.length}</li>
        <li>Active Appeals: {activeAppeals.length}</li>
      </ul>

      <h3>History</h3>
      {appeals.length !== 0 && <p>Click on an appeal to expand.</p>}
      {appeals.length === 0 && <p>No appeals found.</p>}

      <SC.Appeals>
        {appeals.map((a, i) => (
          <AppealFC key={i} appeal={a} />
        ))}
      </SC.Appeals>
    </React.Fragment>
  )
}

interface IAppealProps {
  appeal: Appeal
}

export const AppealFC: FC<IAppealProps> = ({ appeal }) => {
  const [expand, setExpand] = useState(false)

  const toggle = () => {
    setExpand((e) => !e)
  }
  return (
    <SC.AppealWrapper>
      <div className="preview" onClick={toggle}>
        <div className="row">
          <p>Appeal for {appeal.guild}</p>
          <small className={`pill ${appeal.status}`}>
            {statusMap[appeal.status]}
          </small>
        </div>
        <div className="row">
          <small>Created On {appeal.created.toLocaleDateString()}</small>
        </div>
      </div>
      {expand && (
        <div className="expand">
          <p>Last Updated: {appeal.lastUpdate.toLocaleDateString()}</p>

          {appeal.rejectionExpiry && (
            <React.Fragment>
              <p>
                You can appeal again on{" "}
                {appeal.rejectionExpiry.toLocaleDateString()}
              </p>
            </React.Fragment>
          )}

          <h4>Appeal Details</h4>

          <hr />

          <h5>Punishment Date</h5>
          <p>{appeal.punishmentDate}</p>

          <h5>Ban Reason</h5>
          <p>{appeal.banReason}</p>

          <h5>Appeal Reason</h5>
          <p>{appeal.appealReason}</p>

          <h5>Additional Info</h5>
          <p>{appeal.additionalInfo}</p>

          {appeal.decisionReason && (
            <React.Fragment>
              <h5>Note from Staff</h5>
              <p> {appeal.decisionReason} </p>
            </React.Fragment>
          )}
        </div>
      )}
    </SC.AppealWrapper>
  )
}
