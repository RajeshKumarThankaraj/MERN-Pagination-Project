import React from 'react'

export default function Project({projectData}) {
  return (
    <tr>
        <td>
            {projectData.P_Title}
        </td>
        <td>
            {projectData.U_name}
        </td>
        <td>
            {projectData.C_NAME}
        </td>
    </tr>
  )
}
