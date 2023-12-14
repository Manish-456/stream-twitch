interface UserPageProps {
 params : {
    username : string;
 }
}

export default function UserPage({
    params
} : UserPageProps) {
    
    return (
    <div>
      {params.username}
    </div>
  )
}
