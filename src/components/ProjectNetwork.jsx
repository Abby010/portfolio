import { useEffect, useRef, useState } from 'react'
import { select, forceSimulation, forceManyBody, forceCenter, forceLink, drag as d3drag } from 'd3'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import projects from '../data/projects.js'

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event, d) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
}

function ProjectModal({ project, onClose }) {
  const [view, setView] = useState('tech')
  const toggleView = () => setView((v) => (v === 'tech' ? 'eli5' : 'tech'))
  const description = view === 'tech' ? project.techDescription : project.eli5Description

  return (
    <Motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Motion.div
        className="bg-purple-950 text-lime-300 p-6 rounded shadow-lg max-w-lg w-full relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <button className="mb-4 px-3 py-1 rounded bg-lime-300 text-purple-950" onClick={toggleView}>
          {view === 'tech' ? "Explain Like I'm 5" : 'Technical Description'}
        </button>
        <p className="leading-relaxed text-sm">{description}</p>
      </Motion.div>
    </Motion.div>
  )
}

export default function ProjectNetwork() {
  const svgRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!svgRef.current) return
    const width = svgRef.current.clientWidth
    const height = 400
    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    svg.selectAll('*').remove()

    const nodes = projects.map((p) => ({ ...p }))
    const links = []
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        links.push({ source: i, target: j })
      }
    }

    const simulation = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-200))
      .force('center', forceCenter(width / 2, height / 2))
      .force('link', forceLink(links).distance(120))

    const link = svg
      .append('g')
      .attr('stroke', '#4ade80')
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 20)
      .attr('fill', '#7c3aed')
      .attr('stroke', '#4ade80')
      .attr('stroke-width', 2)
      .call(drag(simulation))
      .on('click', (_, d) => setSelected(d))

    const text = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('pointer-events', 'none')
      .attr('fill', '#a7f3d0')
      .style('font-size', '10px')
      .text((d) => d.stack.join(', '))

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
      text.attr('x', (d) => d.x).attr('y', (d) => d.y)
    })

    return () => simulation.stop()
  }, [])

  return (
    <div className="p-6">
      <svg ref={svgRef} className="w-full h-96" />
      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </div>
  )
}
