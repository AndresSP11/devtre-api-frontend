
import { UserHandle } from '../types'
import type { SocialNetwork } from '../types';

type HandleDataProps={
    data:UserHandle
}

export default function HandleData({data}:HandleDataProps) {
    const links:SocialNetwork[]=JSON.parse(data.links).filter((link:SocialNetwork)=>link.enabled);
    console.log(links);
    
  return (
    <div className=' space-y-6 text-white'>
        <p className=' text-5xl text-center font-bold'>{data.handle}</p>
        {data.image && <img src={data.image} alt="Imagen de Perfil" className=' mx-auto max-w-[250px]'/>}
        <p className=' text-lg text-center font-bold'>{data.description}</p>

        <div className=' mt-20 flex flex-col gap-6'>
            {links.length ? links.map((link)=>
                <a 
                key={link.name}
                className=' font-black text-lg font-bold bg-white px-5 py-2 flex items-center text-black rounded-lg shadow-md shadow-white' href={link.url}
                target='_blank'
                rel='noreferrer noopener'
                >
                  <img src={`/social/icon_${link.name}.svg`} alt={'Imagen red social'} className=' w-8 h-8 mr-2'/>
                  Visita mi : {link.name}</a>
            ) : (<p>No hay Links</p>)  }
        </div>

    </div>

  )
}
