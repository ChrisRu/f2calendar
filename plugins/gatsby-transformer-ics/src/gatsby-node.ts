import { parseICS } from './ICSParser'

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}: {
  node: any
  createNodeId: any
  actions: any
  createNode: any
  createContentDigest: any
  loadNodeContent: any
}) {
  const { createNode, createParentChildLink } = actions
  const { extension, id } = node

  if (extension !== `ics`) {
    return
  }

  const rawContent = await loadNodeContent(node)

  const content = parseICS(rawContent)

  const newNode: any = {
    id: createNodeId(`${id} >>> ICS`),
    children: [],
    parent: id,
    absolutePath: node.absolutePath,
    relativePath: typeof node.relativePath === 'string' ? node.relativePath : '',
    internal: {
      content: JSON.stringify(content),
      type: 'ICS',
    },
  }

  newNode.internal.contentDigest = createContentDigest(newNode)

  createNode(newNode)
  createParentChildLink({ parent: node, child: newNode })
}

exports.onCreateNode = onCreateNode
