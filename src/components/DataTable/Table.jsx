import React from "react";

export default function TableRow(props) {
    const tableDisplay = (props) => {
        const {client} = props;
        if(client.length > 0){
               return(
                   client.map((clients, index) => {
                       console.log(clients);
                       return(
                        <table>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Adress</th>
                                <th>Numero phone</th>
                                <th>Numero de compte</th>
                                <th>Solde</th>
                            </tr>
                            </thead>
                            <tbody>                              
                                <tr key={clients.id_client}>     
                                    <td>{clients.nom}</td>
                                    <td>{clients.prenom}</td>
                                    <td>{clients.adress}</td>
                                    <td>{clients.numero_phone}</td>
                                    <td>{clients.num_compte}</td>
                                    <td>{clients.solde}</td>
                                </tr>                    
                            </tbody>
                        </table>
                       )
                   })
               )
        }
    }
    return(
        <>
           {tableDisplay(props)}
        </>
    )
}