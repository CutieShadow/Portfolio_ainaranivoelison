import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
    const blobRefs = useRef([])
    const initialPositions = [
        { x: -4, y: 0 },
        { x: -4, y: 0 },
        { x: 20, y: -8 },
        { x: 20, y: -8 },
    ]

    useEffect(() => {
        let currentScroll = window.pageYOffset
        let requestId

        const updatePositions = () => {
            const newScroll = window.pageYOffset
            
            blobRefs.current.forEach((blob, index) => {
                // SÉCURITÉ : On vérifie si le blob existe avant de toucher au style
                if (!blob) return;

                const initialPos = initialPositions[index] || { x: 0, y: 0 };

                // Calcul du mouvement
                const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340
                const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40

                const x = initialPos.x + xOffset
                const y = initialPos.y + yOffset

                // Application fluide
                blob.style.transform = `translate3d(${x}px, ${y}px, 0)`
                blob.style.transition = "transform 1.4s ease-out"
            })
        }

        const onScroll = () => {
            // Utilisation de requestAnimationFrame pour la performance
            cancelAnimationFrame(requestId)
            requestId = requestAnimationFrame(updatePositions)
        }

        window.addEventListener("scroll", onScroll)
        // Appel initial pour positionner les éléments
        updatePositions()

        return () => {
            window.removeEventListener("scroll", onScroll)
            cancelAnimationFrame(requestId)
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0">
                <div
                    ref={(el) => (blobRefs.current[0] = el)}
                    className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
                ></div>
                <div
                    ref={(el) => (blobRefs.current[1] = el)}
                    className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"
                ></div>
                <div
                    ref={(el) => (blobRefs.current[2] = el)}
                    className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"
                ></div>
                <div
                    ref={(el) => (blobRefs.current[3] = el)}
                    className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"
                ></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
    )
}

export default AnimatedBackground