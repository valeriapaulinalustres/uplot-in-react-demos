

function ModalWindow ({children}) {
	
    return (
		<div className='modal'>
			<div className='window'>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default ModalWindow