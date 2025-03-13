import { useParams } from "react-router-dom";
import { Actor } from "../../shared/Actor/Actor";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { useEffect, useState } from "react";
import { IActor } from "../../hooks/types";
import { useActorByID } from "../../hooks/useActorById";


export function ActorPage() {
  const {id} = useParams()
  const {actor, isLoading} = useActorByID(Number(id))
  
  const [actorState, setActorState] = useState<IActor>()
  useEffect(() => {
    if (actor){
      setActorState(actor)
    }
  }, [actor])

return(
  <div className="mainDivActorPage">
    {!actorState?<div>No actor</div>: 
  
    <div className="filmPage">
      <Header></Header>
      <Actor actor={actorState}></Actor>
      <Footer></Footer>
    </div>}

  </div>
    
  )
}

