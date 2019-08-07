package controllers

import java.io.{BufferedWriter, FileInputStream, FileWriter}

import javax.inject._
import play.api.libs.json._
import play.api.mvc._

@Singleton
class AttractionController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

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
    * Registers a user.
    * @return an action if the profile has been successfully created.
    */
  def makeAttraction: Action[AnyContent] = Action { implicit request =>
    val fileName = "attractionDatabase.json"
    val body: JsValue = request.body.asJson.get
    val attrName = body.as[JsObject].value("attractionName").as[JsString].value
    val description = body.as[JsObject].value("attractionDesc").as[JsString].value
    var url = body.as[JsObject].value("attractionURL").as[JsString].value
    val reviewObj: JsObject = Json.obj()
    if (url == "") {
      url = "data:image/jpeg;base64,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";
    }
    val valueObj: JsObject = Json.obj(
      "desc" -> description,
      "url" -> url,
      "reviews" -> reviewObj)
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val attrObj: JsObject = (prevJson \ "attractions").as[JsObject]
      val updated = withField(attrObj, attrName, valueObj)
      val newDatabase = Json.obj("attractions" -> updated)
      val writer = new BufferedWriter(new FileWriter(fileName))
      writer.write(Json.stringify(newDatabase))
      writer.close()
    } finally {
      stream.close()
    }
    Ok(Json.obj("attractions"->"good"))
  }

  def getAttractionData: Action[AnyContent] = Action { implicit request =>
    val fileName = "attractionDatabase.json"
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val attrObj: JsObject = (prevJson \ "attractions").as[JsObject]
      Ok(attrObj)
    } finally {
      stream.close()
    }
  }

  def getReviewData: Action[AnyContent] = Action { implicit request =>
    val fileName = "attractionDatabase.json"
    val body: JsValue = request.body.asJson.get
    val attrName = body.as[JsObject].value("attractionName").as[JsString].value
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val attrObj: JsObject = (prevJson \ "attractions").as[JsObject]
      val attrNameObj: JsObject = (attrObj \ attrName).as[JsObject]
      val reviewObj: JsObject = (attrNameObj \ "reviews").as[JsObject]
      Ok(reviewObj)
    } finally {
      stream.close()
    }
  }

  def getIndividualReviewData: Action[AnyContent] = Action { implicit request =>
    val fileName = "attractionDatabase.json"
    val body: JsValue = request.body.asJson.get
    val attrName = body.as[JsObject].value("attractionName").as[JsString].value
    val email = body.as[JsObject].value("email").as[JsString].value
    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val attrObj: JsObject = (prevJson \ "attractions").as[JsObject]
      val attrNameObj: JsObject = (attrObj \ attrName).as[JsObject]
      val reviewsObj: JsObject = (attrNameObj \ "reviews").as[JsObject]
      try {
        val emailObj: JsObject = (reviewsObj \ email).as[JsObject]
        val reviewObj: JsString = (emailObj \ "reviewDesc").as[JsString]
        Ok(reviewObj)
      } catch {

        case _: Exception => Ok("")
      }
    } finally {
      stream.close()
    }
  }

  def makeReview: Action[AnyContent] = Action { implicit request =>
    val fileName = "attractionDatabase.json"
    val body: JsValue = request.body.asJson.get
    val attrName = body.as[JsObject].value("attractionName").as[JsString].value
    val description = body.as[JsObject].value("reviewDesc").as[JsString].value
    val email = body.as[JsObject].value("email").as[JsString].value
    val valueObj: JsObject = Json.obj(
      "reviewDesc" -> description,
    )

    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val attrObj: JsObject = (prevJson \ "attractions").as[JsObject]
      val attrNameObj: JsObject = (attrObj \ attrName).as[JsObject]
      val descObj: JsString = (attrNameObj \ "desc").as[JsString]
      val urlObj: JsString = (attrNameObj \ "url").as[JsString]
      val reviewObj: JsObject = (attrNameObj \ "reviews").as[JsObject]
      val updated = withField(reviewObj, email, valueObj)
      val newAttrNameObj: JsObject = Json.obj(
        "desc"-> descObj.value,
        "url" -> urlObj.value,
        "reviews" -> updated
      )
      val dbUpdated = withField(attrObj, attrName, newAttrNameObj)
      val newDatabase = Json.obj("attractions" -> dbUpdated)
      val writer = new BufferedWriter(new FileWriter(fileName))
      writer.write(Json.stringify(newDatabase))
      writer.close()
    } finally {
      stream.close()
    }
    Ok(Json.obj("attractions"->"good"))
  }

  def deleteReview: Action[AnyContent] = Action { implicit request =>
    val fileName = "attractionDatabase.json"
    val body: JsValue = request.body.asJson.get
    val attrName = body.as[JsObject].value("attractionName").as[JsString].value
    val email = body.as[JsObject].value("emailState").as[JsString].value

    val stream = new FileInputStream(fileName)
    try {
      val prevJson: JsValue = Json.parse(stream)
      val attrObj: JsObject = (prevJson \ "attractions").as[JsObject]
      val attrNameObj: JsObject = (attrObj \ attrName).as[JsObject]
      val descObj: JsString = (attrNameObj \ "desc").as[JsString]
      val urlObj: JsString = (attrNameObj \ "url").as[JsString]
      val reviewObj: JsObject = (attrNameObj \ "reviews").as[JsObject]
      val updated = reviewObj - email
      val newAttrNameObj: JsObject = Json.obj(
        "desc"-> descObj.value,
        "url" -> urlObj.value,
        "reviews" -> updated
      )
      val dbUpdated = withField(attrObj, attrName, newAttrNameObj)
      val newDatabase = Json.obj("attractions" -> dbUpdated)
      val writer = new BufferedWriter(new FileWriter(fileName))
      writer.write(Json.stringify(newDatabase))
      writer.close()
    } finally {
      stream.close()
    }
    Ok(Json.obj("attractions"->"good"))
  }
}