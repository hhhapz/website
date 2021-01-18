import React, { FC, useEffect, useState } from "react"
import { info, token, clearToken, submit } from "../../../utils/appeals"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { Button } from "../../Button"
import * as SC from "./styles"

type Inputs = {
  platform: string
  punishmentDate: string
  banReason: string
  appealReason: string
  additionalInfo: string
}

type Platform = { name: string; id: string }

export const Form: FC = () => {
  const [platforms, setPlatforms] = useState<Array<Platform>>([])
  const { register, handleSubmit } = useForm<Inputs>({})

  const load = (token: string) =>
    info(token)
      .then((data) => setPlatforms(data.platforms))
      .catch()

  useEffect(() => {
    const tk = token()
    tk && load(tk)
  }, [])

  const onSubmit = handleSubmit((data: Inputs) => {
    const tk = token()
    if (!tk) {
      alert("Local state not found.")
      navigate("/appeals")
      return
    }

    submit(tk, {
      platform: data.platform,
      punishment_date: data.punishmentDate,
      ban_reason: data.banReason,
      appeal_reason: data.appealReason,
      additional_info: data.additionalInfo,
    })
      .then(() => navigate("/appeals/status"))
      .catch((e) => {
        alert(e)
      })
  })

  return (
    <SC.Form onSubmit={onSubmit}>
      <label htmlFor="platform" className="required">
        Which Server Are You Appealing For?
      </label>
      <select id="platform" {...register("platform")} required defaultValue="">
        <option disabled value="">
          Select Platform
        </option>
        {platforms.map(({ id, name }, i) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="date">
        <p>Date Of Ban/Punishment</p>
        <small className="required">When where you banned?</small>
      </label>
      <input
        type="text"
        id="date"
        maxLength={128}
        required
        {...register("punishmentDate")}
      />

      <label htmlFor="banReason">
        <p>Ban Reason</p>
        <small className="required">Why do you believe you were banned?</small>
      </label>
      <input
        type="text"
        id="banReason"
        maxLength={256}
        required
        {...register("banReason")}
      />

      <label htmlFor="appealReason">
        <p>Appeal Reason</p>
        <small className="required">Why should we unban you?</small>
      </label>
      <textarea
        id="appealReason"
        maxLength={1000}
        required
        {...register("appealReason")}
      />

      <label htmlFor="additional">
        <p>Additional Info</p>
        <small>
          Any additional information or clarification you would like to provide.
        </small>
      </label>
      <textarea
        id="additional"
        maxLength={1000}
        {...register("additionalInfo")}
      />

      <hr />

      <input type="submit" value="Submit" />
      <Button to="/appeals/info">Go Back</Button>
    </SC.Form>
  )
}
