import { useEffect, useState } from 'react'
import NavigationTabs from './NavigationTabs'
import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SocialNetwork, User } from '../types'
import DevTreeLink from './DevTreeLink'

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useQueryClient } from '@tanstack/react-query'
import Header from './Header'
type DevTreeProps = {
    data: User
}

export const DevTree = ({ data }: DevTreeProps) => {

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((link:SocialNetwork) => link.enabled));

    useEffect(() => {
        const updatedLinks = JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
        setEnabledLinks(updatedLinks)
        /* En este caso vamos a tener el nuevo setEnabled siempre y cuando se tenda o cambie la data para que se mande por via props el enlace */
    }, [data])

    const queryClient = useQueryClient();

    const handleDragEnd = (e: DragEndEvent) => {
        /* Active es e lqeu seleccion el div, luego la parte del over es a donde lo dejaron */
        const { active, over } = e;

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id);

            const newIndex = enabledLinks.findIndex(link => link.id === over.id);
            const order = arrayMove(enabledLinks, prevIndex, newIndex);

            setEnabledLinks(order);

            const disabledLinks = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled);

            console.log(disabledLinks);

            const links = [...order, ...disabledLinks]


            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }
            })
        }
    }

    return (
        <>
            
            <Header></Header>

            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs></NavigationTabs>
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={data.handle}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil:{data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">

                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            {/* Configuracion  */}
                            <p className=' text-white text-center text-4xl'>{data.handle}</p>
                            {
                                data.image &&
                                /* Esto se va dar normal cuando tenga la data automatizada */
                                <img src={data.image} alt="Imagen Perfil" className=' mx-auto max-w-[250px]' />
                            }

                            <p className=' text-center text-lg font-black text-white'>{data.description}</p>
                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className=' mt-20 flex flex-col gap-5'>

                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {
                                            enabledLinks.map(link => (

                                                <DevTreeLink key={link.name} link={link}></DevTreeLink>

                                            ))
                                        }
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}
