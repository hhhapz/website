import React, { Fragment, useEffect } from "react"
import { loggedIn, authorize } from "../../utils/appeals"
import { navigate } from "gatsby"

function AppealAuthorizePage() {
  useEffect(() => {
    if (loggedIn()) {
      navigate("/appeals/info")
    }

    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get("code")
    const state = queryParams.get("state")

    if (!code || !state) {
      navigate("/appeals")
      return
    }

    authorize(code, state)
      .then(() => navigate("/appeals/info"))
      .catch((e) => alert(e))
  }, [])

  return <Fragment></Fragment>
}

export default AppealAuthorizePage
