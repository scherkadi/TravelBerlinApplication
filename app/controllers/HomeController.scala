package controllers

import java.io.{BufferedWriter, FileInputStream, FileWriter}
import java.sql.SQLSyntaxErrorException

import javax.inject._
import play.api.libs.json._
import play.api.mvc._

/**
  * This is the home controller class. It connects the activities of the frontend and backend.
  * @param cc Controller components reference.
  */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

  /**
    * Appends a field to the database.
    * @param j a JsObject to append.
    * @param key The key to append.
    * @param value the value associated with the key.
    * @param w an implicit value of type Writes
    * @tparam A the type of Writes
    * @return a JsObject that is appended to the database.
    */
  private def withField[A](j: JsObject, key: String, value: A)(implicit w: Writes[A]) =
    j ++ Json.obj(key -> value)

  /**
    * Replaces a field in the database.
    *
    * @param j     a JsObject to append.
    * @param key   The key to append.
    * @param value the value associated with the key.
    * @param w an implicit value of type Writes
    * @tparam A the type of Writes
    * @return a JsObject that is appended to the database.
    */
  private def replaceField[A](j: JsObject, key: String, value: A)(implicit w: Writes[A]) =
    Json.obj(key -> value)

  /**
    * Registers a user.
    * @return an action if the profile has been successfully created.
    */
  def register: Action[AnyContent] = Action { implicit request =>

    val fileName = "userDatabase.json"
    val body: JsValue = request.body.asJson.get
    val email = body.as[JsObject].value("Email").as[JsString].value
    //we want to create a new jsobject that holds the profile and password as the value passed into withfield
    val password = body.as[JsObject].value("Password").as[JsString]
    var admin = false
    try {
      admin = body.as[JsObject].value("admin").as[JsBoolean].value
    } catch {
      case foo: Exception => admin = false
    }

    val profileObj: JsObject = Json.obj(
      "firstname" -> "",
      "lastname" -> "",
      "email" -> email,
      "birthYear" -> "",
      "hometown" -> "",
      "interests" -> "",
      "admin" -> admin

    )
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val emailObj: JsObject = (prevJson \ "users").as[JsObject]
      val valueObj: JsObject = Json.obj(
        "password" -> password,
        //"admin" -> admin,
        "profile" -> profileObj
      )
      val updated = withField(emailObj, email, valueObj)
      val newDatabase = Json.obj("users" -> updated)
      val writer = new BufferedWriter(new FileWriter(fileName))
      //println("NEW DATA: " + Json.stringify(newDatabase))
      writer.write(Json.stringify(newDatabase))
      writer.close()
    } finally {
      stream.close()
    }
    Ok(Json.obj("profile"->"good"))
  }

  /**
    * Retrieve profile data.
    * @return an action that returns the value of the profile object.
    */
  def getProfileData: Action[AnyContent] = Action { implicit request =>
    val fileName = "userDatabase.json"
    //println(request.body)
    val body: JsValue = request.body.asJson.get
    val email = body.as[JsObject].value("email").as[JsString].value
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val emailObj: JsObject = (prevJson \ "users").as[JsObject]
      val wrapObj: JsObject = (emailObj \ email).as[JsObject] //extracts email block
      val profObj: JsObject = (wrapObj \ "profile").as[JsObject] //extracts profile obj
      Ok(profObj)
    } finally {
      stream.close()
    }
  }

  /**
    * Logs a user in.
    * @return an action that returns a value if login is successful or unsuccesful.
    */
  def login: Action[AnyContent] = Action { implicit request =>
    val body = request.body.asJson.get.as[JsObject]
    val email = body.as[JsObject].value("Email").as[JsString].value
    val password = body.as[JsObject].value("Password").as[JsString].value
    val chk = validateLogin(email, password)
    if (chk._1) {
      Ok(Json.obj("login"->"good", "email" -> email, "admin" -> chk._2))
    } else {
      Ok(Json.obj("login"->"bad"))
    }
  }

  def isAdmin: Action[AnyContent] = Action { implicit request =>
    val body = request.body.asJson.get.as[JsObject]
    val admin = body.as[JsObject].value("Admin").as[JsBoolean].value
    if (admin) {
      Ok(Json.obj("admin"->"good"))
    } else {
      Ok(Json.obj("admin" -> "bad"))
    }
  }

  /**
    * Creates a profile.
    * @return an action that returns a value when a profile is created.
    */
  def profile: Action[AnyContent] = Action { implicit request =>
    val fileName = "userDatabase.json"
    val body = request.body.asJson.get.as[JsObject]
    val obj: JsObject = (body \ "user").as[JsObject]
    val email = obj.as[JsObject].value("email").as[JsString].value
    val firstName = obj.as[JsObject].value("firstname").as[JsString].value
    val lastName = obj.as[JsObject].value("lastname").as[JsString].value
    val birthYear = obj.as[JsObject].value("birthYear").as[JsString].value
    val hometown = obj.as[JsObject].value("hometown").as[JsString].value
    val interests = obj.as[JsObject].value("interests").as[JsString].value
    val admin = obj.as[JsObject].value("admin").as[JsBoolean]
    val profileObj: JsObject = Json.obj(
        "firstname" -> firstName,
          "lastname" -> lastName,
          "birthYear" -> birthYear,
          "email" -> email,
          "hometown" -> hometown,
          "interests" -> interests,
          "admin" -> admin
    )
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val emailObj: JsObject = (prevJson \ "users").as[JsObject] //extracts user block
      val wrapObj: JsObject = (emailObj \ email).as[JsObject] //extracts email block
      val passObj: JsString = (wrapObj \ "password").as[JsString] //extracts password obj
      val valueObj: JsObject = Json.obj(
        "password" -> passObj.value,
          "profile" -> profileObj
      )
      val updated = withField(emailObj, email, valueObj)
      val newDatabase = Json.obj("users" -> updated)
      val writer = new BufferedWriter(new FileWriter(fileName))
      writer.write(Json.stringify(newDatabase))
      writer.close()
    } finally {
      stream.close()
    }
    Ok(Json.obj("profile"-> "good"))
  }
  /**
    * Validates login.
    * @param email the email of the user.
    * @param pass the password of the user.
    * @return a boolean holding the value of whether or not a user's login credentials are valid.
    */
  def validateLogin(email: String, pass: String) = {
    val fileName = "userDatabase.json"
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val emailObj: JsObject = (prevJson \ "users").as[JsObject]
      val wrapObj: JsObject = (emailObj \ email).as[JsObject]
      val passObj: JsString = (wrapObj \ "password").as[JsString]
      val profObj: JsObject = (wrapObj \ "profile").as[JsObject]
      val isAdmin: JsBoolean = (profObj \ "admin").as[JsBoolean]

      val result = passObj.value.contains(pass)
      (result, isAdmin.as[Boolean])
    } catch {
      case e: Exception => (false, false)
    } finally {
      stream.close()
    }
  }
}
